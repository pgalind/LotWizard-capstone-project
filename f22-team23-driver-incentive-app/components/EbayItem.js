import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';
import Layout from '../components/Layout';
import Cookie from 'js-cookie';
import user from '../services/user';

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
    if ('additionalImages' in post) {
      const imageUrl = [post.image];
      var pictures = imageUrl.concat(post.additionalImages);

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
  }


  // Adds the current item to the cart
  // Added by Kaleb
  function addToCartClicked() {
    console.log("CLICKED");
    user.cart.push(prop.itemID);
    console.log(user.cart);
    return(<Layout></Layout>);
  }
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api.ebay.com/buy/browse/v1/item/` + prop.itemID,
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
    //<span className="flex p-4 shadow-xl rounded-lg catalog-item-border catalog-item-internal">
    <div className="flex flex-col catalog-item-border bg-black rounded-lg">
      <span className="flex p-4 catalog-background rounded-t-lg">
        <Link href={`/catalog/${prop.itemID}`}>
          <a>
            <div>
              <img
                className="object-contain h-48 w-96"
                src={image}
                alt={image}
              />
            </div>
          </a>
        </Link>
      </span>
      <div className="flex bg-white justify-center space-between">
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

      <div className="bg-white shadow-xl flex flex-col p-4 items-center grow rounded-b-lg">
        <div>
          <Link href={`/catalog/${prop.itemID}`}>
            <a>
              <h2 className="font-semibold pb-2">{post.title}</h2>
            </a>
          </Link>
        </div>
        <div className="text-zinc-500 tracking-widest">
          <p className="text-xs">Hover for Item Description</p>
        </div>
        <p>☆{post.price.value}</p>
        {prop.view == 'driver' ? (
          <button
            className="primary-button bg-slate-200 mt-4 py-2 px-4 rounded-lg hover:text-white hover:bg-blue-400"
            type="button"
            onClick={() => addToCartClicked()}
          >
            Add to cart
          </button>
        ) : (
          <button
            className="primary-button bg-slate-200 mt-4 py-2 px-4 rounded-lg hover:text-white hover:bg-blue-400"
            type="button"
          >
            Add to catalog
          </button>
        )}
      </div>
    </div>
  ) : (
    //</span>
    <div>Loading . . .</div>
  );
}
