import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

// This variable inconsistently increments when it's declared inside EbayItem() for some reason
var imageIndex = 0;

// NOTE: Ebay's auth token changes often; If the page is stuck on loading
// Please generate a new auth token by going to https://developer.ebay.com/my/api_test_tool?index=0
// and set it to auth value in axios call
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

  //https://api.ebay.com/buy/browse/v1/item/v1|374289166032|0
  //'https://jsonplaceholder.typicode.com/posts/1',
  //{loading ? 'Loading' : post.title}
  //{error ? error : null}
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
      .then((response) => {
        setLoading(false);
        setPost(response.data);
        setError('');
        console.log(response);
        console.log(response.data.title);
        console.log(response.data.price.value);
        setImage(response.data.image.imageUrl);
      })
      .catch((error) => {
        setLoading(false);
        setPost({});
        setError("Couldn't retrive catalog info from ebay :/");
        console.log(error);
      });
  }, [prop]);

  return Object.keys(post).length ? (
    <div className="flex space-between align-center">
      <Link href={`/catalog/${prop.itemID}`}>
        <a>
          <img src={image} alt={image} className="w-96 h-96" />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/catalog/${prop.itemID}`}>
          <a>
            <h2 className="text-lg">{post.title}</h2>
          </a>
        </Link>
        <p className="mb-2">{'Placeholder text'}</p>
        <div onClick={() => changePicture('right')}>Next picture</div>
        <div onClick={() => changePicture('left')}>Prev picture</div>
        <p>${post.price.value}</p>
        <button className="primary-button" type="button">
          Add to cart
        </button>
      </div>
    </div>
  ) : (
    <div>Loading . . .</div>
  );
}
