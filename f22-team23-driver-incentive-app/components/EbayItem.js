import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';
import Cookie from 'js-cookie';

// This variable inconsistently increments when it's declared inside EbayItem() for some reason
var imageIndex = 0;

// If token=? in <EbayItem token=? />, we can get token value here by calling prop.token
// I have no idea why react.js is set up to where we get the property of a passed in value
// instead of the passed in value itself
export default function EbayItem(prop) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [post, setPost] = useState({});
  const [image, setImage] = useState('');

  function changePicture(dir) {
    // 👇️ refers to the div element
    //console.log(event.currentTarget);
    const imageUrl = [post.image];
    const pictures = imageUrl.concat(post.additionalImages);

    if (dir == 'right' && imageIndex < pictures.length) {
      imageIndex++;
      console.log('right');
    } else if (dir == 'left' && imageIndex > 0) {
      console.log('left');
      imageIndex--;
    }

    setImage(pictures[imageIndex].imageUrl);

    console.log(pictures[imageIndex].imageUrl);
    console.log(pictures);
    console.log(imageIndex);
    console.log('Next picture');
  }
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api.ebay.com/buy/browse/v1/item/v1|` + prop.itemID.split("|")[1] + `|0`,
      headers: {
        Authorization: prop.token,
        'Content-Type': 'application/json',
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
        'X-EBAY-C-ENDUSERCTX':
          'contextualLocation=country=<2_character_country_code>,zip=<zip_code>,affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId></referenceId>',
      },
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setPost(res.data);
        setImage(res.data.image.imageUrl);
        console.log(res.data.title);
        console.log(res.data.price.value);
      })
      .catch((error) => {
        setLoading(true);
        setPost({});
        setError("Couldn't retrive catalog info from ebay :/");
        console.log(error);
        if (prop.refresh == true && error.response.request.status == 401) {
          // If unauthorized, remove cookie so catalog.js can automatically request a new token
          console.log('Invalid cookie cleared');
          console.log('catalog.newToken() called from EbayItem.js');
          prop.newToken();
        }
      });
  }, []);

  return Object.keys(post).length ? (
    <span className="flex p-4 bg-slate-200 shadow-xl rounded-lg catalog-item-border catalog-item-internal">
      <div className="card">
        <span className="flex p-4 bg-zinc-300 rounded-lg">
          <Link href={`/catalog/${prop.itemID}`}>
            <a>
              <div className="rounded">
                <img
                  className="object-contain h-48 w-96"
                  src={image}
                  alt={image}
                />
              </div>
            </a>
          </Link>
        </span>
        <div className="flex justify-center space-between">
          <div>
            <Button
              startIcon={
                <ArrowBackIosIcon
                  color="action"
                  onClick={() => changePicture('left')}
                />
              }
            ></Button>
          </div>
          <div>
            <Button
              startIcon={
                <ArrowForwardIosIcon
                  color="action"
                  onClick={() => changePicture('right')}
                />
              }
            ></Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-0 text-black">
          <div className="center">
            <Link href={`/catalog/${prop.itemID}`}>
              <a>
                <h2 className="font-semibold">{post.title}</h2>
              </a>
            </Link>
          </div>
          <div className="stretch text-zinc-500 tracking-widest">
            <p className="text-xs">(Hover for Item Description)</p>
          </div>
          <p>☆{post.price.value}</p>
          <button
            className="primary-button mt-0 bg-slate-200 py-3 px-6 rounded-lg hover:bg-blue-600"
            type="button"
          >
            Add to cart
          </button>
        </div>
      </div>
    </span>
  ) : (
    <div>Loading . . .</div>
  );
}
