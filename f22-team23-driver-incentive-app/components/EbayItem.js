import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';

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

    if (dir == 'right' && imageIndex < pictures.length - 1) {
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
      url: `https://api.ebay.com/buy/browse/v1/item/v1|374289166032|0`,
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
        setLoading(false);
        setPost({});
        setError("Couldn't retrive catalog info from ebay :/");
        console.log(error);
      });
  }, []);

  return Object.keys(post).length ? (
    <span className="flex p-4 bg-slate-200">
      <div className="flex flex-col w-[25%] justify-content-center">
        <Link href={`/catalog/374289166032`}>
          <a>
            <img src={image} alt={image} />
          </a>
        </Link>
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
      </div>

      <div className="flex flex-col w-[75%] items-center justify-center p-5">
        <Link href={`/catalog/374289166032`}>
          <a>
            <h2 className="text-lg">{post.title}</h2>
          </a>
        </Link>
        <p className="mb-2">Item description</p>
        <p>${post.price.value}</p>
        <button
          className="primary-button mt-5 bg-slate-200 py-3 px-6 rounded-lg hover:bg-blue-600"
          type="button"
        >
          Add to cart
        </button>
      </div>
    </span>
  ) : (
    <div>Loading . . .</div>
  );
}
