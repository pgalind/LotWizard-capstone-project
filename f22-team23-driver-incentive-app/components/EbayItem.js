import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
//import { token } from '../lib/token';

// This variable inconsistently increments when it's declared inside EbayItem() for some reason
var imageIndex = 0;

// NOTE: Ebay's auth token changes often; If the page is stuck on loading
// Please generate a new auth token by going to https://developer.ebay.com/my/api_test_tool?index=0
// and set it to auth value in axios call
export default function EbayItem(itemID) {
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
  var auth =
    'Bearer v^1.1#i^1#r^0#p^1#I^3#f^0#t^H4sIAAAAAAAAAOVYD2wTVRhf908bGAtM0UwM9QD/wd296/Wu7UErhTJXZWtHxxgzMK5378qx9q7ce926iGzMxAgoCQIhRLPMhEQTFPwDBhIjGhKNMRiCEhI1MZAQp4JCSPw3pt61ZXSTALImLrG5pHnf+973fr/f+7733h3orbQ/+lz9c79W2e4oHegFvaU2GzMJ2Csr5k4pK62tKAEFDraB3tm95X1lgwuQmEykhGUQpXQNQUcmmdCQkDX6iLShCbqIVCRoYhIiAUtCNNCwVHBSQEgZOtYlPUE4QkEf4QSyIrs5SQKcG/CcZFq1qzGbdR+hxFxe4GQVr6i4ZRnyZj9CaRjSEBY1bI13OkkGkAzTDBiB4QXAUryXbyMcLdBAqq6ZLhQg/Fm4QnasUYD1xlBFhKCBzSCEPxSoi4YDoeCSxuYFdEEsf16HKBZxGo1uLdZl6GgRE2l442lQ1luIpiUJIkTQ/twMo4MKgatgbgN+TuqYOyZ6PbwHOt0cxypFkbJON5IivjEOy6LKpJJ1FaCGVdx9M0VNNWLroITzrUYzRCjosP6a0mJCVVRo+IgliwIrA5EI4V8id4mG3BgnkahA2VA7yciyIMl5YqKZV4xMSm7ODVmJy0+Ui5aXecxMi3VNVi3RkKNRx4ugiRqO1QYUaGM6hbWwEVCwhajQj72qoQe0WYuaW8U0XqtZ6wqTphCObPPmKzAyGmNDjaUxHIkwtiMrkY8QUylVJsZ2ZnMxnz4Z5CPWYpwSaLqrq4vqYindiNNOABi6tWFpVFoLkyJh+lq1nvNXbz6AVLNUJGiORKqAu1MmloyZqyYALU74XTznZD153UfD8o+1/sNQwJkeXRHFqhA5xvIul5dj3Rwri25nMSrEn09S2sIBY2I3mRSNDohTCVGCpGTmWToJDVUWWE4xtVEgKfNehXR5FYWMcTJPMgqEAMJYTPJ6/k+FcqupHoWSAXFRcr1oed5Wl1FBOObpbJIbl4aXRxu8QX6l1sg6E+sioQ73+kWdwfWtT7gCT9bFfbdaDdclvzihmso0m/MXQwCr1osnQr2OMJTHRS8q6SkY0ROq1D2xFpg15Iho4O4oTCRMw7hIBlKpUHH26qLR+5fbxO3xLt4Z9R+dT9dlhayUnVisrPHIDCCmVMo6gShJT9JWreuief2wzO1Z1OPirZo31wnF2iSZY6vKuSsnlaVLoU6JMiDS04Z526bC1g2sWe+AmnmeYUNPJKDRwoy7npPJNBZjCTjRCrsICa6KE+ywZXiec3HAy7Pj4iVlj9L2ibYlFWMrLn/8Nq/V9OiXfH9J9sf02Q6BPtvbpTYboMEcZhZ4oLJseXnZ5FqkYkipokIhNa6Z764GpDpgd0pUjdJK28YGoelUwWeFgVXg3pEPC/YyZlLBVwYw41pPBVN9T5XTyQDGenjAtoFZ13rLmenld/V8d+a3O3+Eg/bV29+4sqnp4Nm7m34HVSNONltFSXmfraRy0w9HVnfJv/Sc3jB/5uCWaP179LBj/wcrOi+EdjieP1I9r2fq11sztX0nX3u2ehW/077smde3ZE5lTnxZ79v/8v2Tg+KL0oUFJw8fOyOFp8+dPrkHz9t+5fBjC//8qyb+9DenQw/te2H75taqmds2RGoGptkvf1622/nmukd+pl85f+nogTXnPur/cOjg9wMtvXvenzPcP7Sr+vhX9RXvnO3vGTy2d0amwt5KoqG3AlPO12h2+tXl7e0dJ7/d/e7CE4d2bLuvaejTl1av6K/dsHHwj33DsxvoqXumfnL8yFM/MVOO4q3xEwRYUf3gtEmhj9XKhr3Va84euHhl52eXdzWfu/hFT8qxeXfN8KWj8x/OLd/fkT15tfARAAA=';
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api.ebay.com/buy/browse/v1/item/v1|${itemID}|0`,
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json',
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
        'X-EBAY-C-ENDUSERCTX':
          'contextualLocation=country=<2_character_country_code>,zip=<zip_code>,affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId></referenceId>',
      },
    })
      .then((res) => {
        res.json();
        console.log(res);
      })
      .then((data) => {
        setLoading(false);
        setPost(data);
        setImage(data.image.imageUrl);
        console.log(data.title);
        console.log(data.price.value);
      })
      .catch((error) => {
        setLoading(false);
        setPost({});
        setError("Couldn't retrive catalog info from ebay :/");
        console.log(error);
      });
  }, [itemID]);

  return Object.keys(post).length ? (
    <div className="flex space-between align-center">
      <Link href={`/catalog/${itemID}`}>
        <a>
          <img src={image} alt={image} className="w-96 h-96" />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/catalog/${itemID}`}>
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
