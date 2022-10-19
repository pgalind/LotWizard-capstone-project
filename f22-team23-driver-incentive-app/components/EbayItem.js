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
    'Bearer v^1.1#i^1#r^0#f^0#I^3#p^1#t^H4sIAAAAAAAAAOVYbWwURRju9a6VApVI+FAEOa7wg4/bm9372lt6lxwthdP2rnClgQbEvdnZY9u93WVnru3FxFwbKBiJhBhNxC/Er2CUSJQE0OAPQjSIIFG0xkQ+Cko0/tEgKgru3h3lWgkgvcQm3p/LvPPOO8/zzPvOzA7IVlbN61vad6naclf5jizIllss9DhQVVkx/25r+bSKMlDkYNmRnZ219Vov1GI+JWvccoQ1VcHI3p2SFczljEFHWlc4lccS5hQ+hTBHIBcPNzVyDAU4TVeJClXZYY/UBx1QTIiJBBtgGCgwKMEYVuVazBY16OD9iA4wbjEQcHsYGnmMfozTKKJgwisk6GAAwzhp4KTZFprl3B7O7ad8wNfmsLciHUuqYrhQwBHKweVyY/UirDeHymOMdGIEcYQi4YZ4LBypXxxtqXUVxQoVdIgTnqTx0FadKiB7Ky+n0c2nwTlvLp6GEGHscIXyMwwNyoWvgbkD+DmphYTfh3gAIQR+wPj5kkjZoOopntwch2mRBKeYc+WQQiSSuZWihhqJdgRJoRU1QkTq7ebfsjQvS6KE9KBj8aLwqnBzsyO0WOjidSGadGJeRIIudTqbl9c7vWyCh8BLC07o9/qRG3oLE+WjFWQeNlOdqgiSKRq2R1WyCBmo0XBtmCJtDKeYEtPDIjERFfkxoKChN8C2mYuaX8U0WaeY64pShhD2XPPWKzA4mhBdSqQJGowwvCMnkVE2miYJjuGduVwspE83DjrWEaJxLldXVxfV5aZUPeliAKBdK5sa43AdShkZ0p0yaz3vL916gFPKUYHIGIkljmQ0A0u3kasGACXpCHl8XsbNFnQfCis03PoPQxFn19CKKFWFeAIMpFkPj0Qf6xchXYoKCRWS1GXiQAk+40zxegcimsxD5IRGnqVTSJcEzu0VDW1E5BR8AdHpCYiiM+EVfE5aRAgglEjAAPt/KpTbTfU4gjoiJcn1kuV5W0O3BGIJtnOZEG2MrYg3Bep9q5Som5HbmyMd/vWLOuvXr3zQE36oIRm83Wq4Ifk6WTKUaTHmL4UAZq2XToSlKiZIGBG9OFQ11KzKEsyMrgV260Izr5NMHMmyYRgRybCmRUqzV5eM3r/cJu6Md+nOqP/ofLohK2ym7OhiZY7HRgBekyjzBKKgmnKZta7yxvXDNK/NoR4Rb8m4uY4q1gbJPFtJyF85qRxdCndCSkdYTevGbZuKmTewFrUDKcZ5RnRVlpHeSo+4nlOpNOETMhpthV2CBJf4UXbY0j6fj6ZZ4PePiBfMHaVrR9uWVIqt2LbkDq/VrqEf+aGy3I/utewFvZY95RYLcIE5dA2YVWldYbOOn4YlgiiJFyksJRXj21VHVAfKaLykl1daHmvilp0selbYsQbcO/iwUGWlxxW9MoDp13sq6AlTqxmGBjRLs26P298Gaq732ugptkk9hxfgR479dF9PQ9bKbryyoPZi33ugetDJYqkos/Vaysr2xvah+z8eeGr7s9zWrq9PHN0wZmd2arX1beFY/+TXpkzedkI7+/Tjx7cH+7f1ZU+dP97/666Nq+5ufGdi1dYzD8MXhbrZnX/Me3PPBWX/1CuZ9sAHz3Mnn/nxiTHf9s9t6Hlu4QH7hOqr4i+fn257I3PA89WC3/4aCHz0VtnMscH3yZHYanAu2QguzHx008GKOfqeUHjbA3BG9OquizsP7j69ofaV8WsmdXy6M/bhn9LluTXzbU2xb7amZ6xYPX3zUS3z8pkvf/7u0KVPDsS/X9h6ru78qwd/Xz9r4uWmgXbQs3QLd/aedydt2b2kxrJx3Ben5C0/tAv79h+J7UcvtB7a9NlAcvOsKvLS69vHHn4yv3x/A9PV5XPwEQAA';

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
