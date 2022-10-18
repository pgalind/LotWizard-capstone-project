import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import token from '../lib/token';

// This variable inconsistently increments when it's declared inside EbayItem() for some reason
var imageIndex = 0;

// NOTE: Ebay's auth token changes often; If the page is stuck on loading
// Please generate a new auth token by going to https://developer.ebay.com/my/api_test_tool?index=0
// and set it to auth value in axios call
export default function EbayItem() {
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
    'Bearer v^1.1#i^1#f^0#r^0#p^1#I^3#t^H4sIAAAAAAAAAOVYf2wTVRxft25kwgQEERFJPdCEH72+u2uv7blWu3WDKms72vFj8sN3d++2Y9e74+66rX84y1CQQByJwQhoWIhoiJEEiUSiJGKIxEFQE0n8kRAjEvwBBhMi8UeId20Z3SSArIlN7D/N+77v+77P5/O+3/fePZCtqZ23cdHGK3W2cZWDWZCttNmI8aC2pnr+3VWVM6orQJGDbTA7J2vvr/qhXocpSWWWIF1VZB05elOSrDM5YwBLazKjQF3UGRmmkM4YHJMItSxmSBwwqqYYCqdImCMSDmDIDyjkgR6eIliOBaRpla/FTCoBjKRYGhGEl6YB9EM3a/brehpFZN2AsmH2A5J0EsBJUEnCx7jdjIfC3bS3HXMsRZouKrLpggMsmIPL5MZqRVhvDhXqOtIMMwgWjISaE7FQJNwUTda7imIFCzokDGik9ZGtRoVHjqVQSqObT6PnvJlEmuOQrmOuYH6GkUGZ0DUwdwA/JzXLemnKTQGOJ90CAKWRslnRUtC4OQ7LIvJOIefKINkQjcytFDXVYNcizii0omaISNhh/bWmoSQKItICWFNDaEUoHseCTXwP1Phoh1OHAuI1sdsZXxJ2enws5ICH4J2c1+NFFOcpTJSPVpB51EyNisyLlmi6I6oYDchEjUZrQxVpYzrF5JgWEgwLUZEfCa5p6CHbrUXNr2La6JStdUUpUwhHrnnrFRgebRiayKYNNBxhdEdOogAGVVXksdGduVwspE+vHsA6DUNlXK6enh68h8IVrcNFAkC4lrcsTnCdKAUx09eq9by/eOsBTjFHhUPmSF1kjIxqYuk1c9UEIHdgQTftISlfQfeRsIKjrf8wFHF2jayIklWIT4BmyngR5H3AIjH2AgkWctRlwUAszDhTUOtChipBDjk5M83SKaSJPEN5BFMaATl52i843X5BcLIennYSAkIAIZbl/L7/U53cbqYnEKchoySpXrI0b2/uFUGM9XW38tHFsbZEiz9Mr5CjFCmtjUe6vOsausPrlj/hDj3Z3BG43WK4IflGSTSVSZrzl1+tL1J0A/FjopfgFBXFFUnkMuW1wJTGx6FmZBJIkkzDmEiGVDVSmq26ZPT+5TZxZ7xLd0T9R8fTDVnpVsqWFytrvG4GgKqIWycQzikpl2LVOjRvH5Z5TQ71mHiL5sW1rFibJPNsRT5/48QViy6ud3O4hnQlrZmXbTxmXcCSSheSzfPM0BRJQtpSYsz1nEqlDchKqNwKuwQJLsIyO2wJmvbQPpr2U2PixeWO0jXltiWVZCu2N9/Zrdo18hs/WJH7Ef22d0G/7UClzQZc4GFiNniopqrNXjVhhi4aCBehgOtih2x+umoI70IZFYpaZY2tr4VpPV30qjC4CkwffleorSLGFz0ygJnXe6qJiffVkSQBCIrwud0eqh3Mvt5rJ6bZp76ttqWGtm3ZuTOR2jJ0pOFZ+yeHKVA37GSzVVfY+20V8XPElGPJhac23XNl+u9/TVrxdeWyM/i2S/sfeGnBoXH1O/l5P548+8uW82cbvx+at2v6ryvXf/hl9yx1808vP7dsYeb5bPRy6vLRia/0uSY9+t1Wdf2eux6RWtdMWzfn4rF3rm6S9hEXmd3vv/B6/6rP23as/vaxp9vr/jg7hK0+/dqFmXua/2x9Txna379w/ubOpOAnL53w+y6cOT5/ysqjh8Ov7h249+OpVzc98/jBufQutNy3oT1dt92e/ub+yQcnfDr0Jpjy1IOfgQnsem4gvPvEV9tXO168tO+jzqs9NfW1TX1vCdu5viPHBz7IvnHg5Bdzj+07VPHb1h2n5J9nbICDMXfjwORZaPe5BcL5veH88v0Ng3PFgO8RAAA=';
  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://api.ebay.com/buy/browse/v1/item/v1|374289166032|0',
      headers: {
        Authorization: auth,
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
  }, []);
  return Object.keys(post).length ? (
    <div className="card">
      <Link href={'/catalog/5'}>
        <a>
          <img src={image} alt={image} className="w-96 h-96" />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={'/catalog/5'}>
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
