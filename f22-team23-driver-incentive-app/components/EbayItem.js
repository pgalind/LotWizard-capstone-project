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
    'Bearer v^1.1#i^1#f^0#p^1#I^3#r^0#t^H4sIAAAAAAAAAOVYe2wURRjvtdcSRFqjSElFPLb1EWT3Zvdu9/YW7uD6klPaK1whbX3Ufcxel+7tHjt7vRYD1gabqCEa0pgIPkCJiuFVIiKViEFNiMEEE41i/yFBE0SIBlJJFMXdu6NcKwGkl9jE++cy33zzze/3m++bmR3QWzJ1Xv+S/gvTHVMKt/SC3kKHg5wGppYUP1haVFhRXAByHBxbeqt6nX1FpxYiPq4muOUQJXQNQVd3XNUQlzYGsKShcTqPFMRpfBwizhS5aKhhKUcRgEsYuqmLuoq5wrUBjPHTPq+HYgWPjwQkZCyrdjlmsx7AIANJQfCQXpkCvORlrX6EkjCsIZPXzABGAYrCSYBToJlkOcByXoqgPaANc62EBlJ0zXIhABZMw+XSY40crNeGyiMEDdMKggXDofpoJBSurWtsXujOiRXM6hA1eTOJxrZqdAm6VvJqEl57GpT25qJJUYQIYe5gZoaxQbnQZTA3AT8tNQ0kS03W7/cJtEh75bxIWa8bcd68Ng7boki4nHbloGYqZs/1FLXUEFZB0cy2Gq0Q4VqX/bcsyauKrEAjgNVVh1pDTU1YsE5K8YbUGMMRL0PJULrwpuW1OM0KvAhoUsJFH+2DHpHOTpSJlpV53Ew1uiYptmjI1aib1dBCDcdq4+PoHG0sp4gWMUKyaSPK8aPAZQ0pps1e1MwqJs0OzV5XGLeEcKWb11+B0dGmaShC0oSjEcZ3pCUKYHwioUjY+M50LmbTpxsFsA7TTHBudyqVIlIeQjdibgoA0t3SsDQqdsA4j1m+dq1n/JXrD8CVNBURWiORwpk9CQtLt5WrFgAthgW9DE152KzuY2EFx1v/Ycjh7B5bEfmqEL/MkCQl+r28j5F4FuajQoLZJHXbOKDA9+Bx3uiEZkLlRYiLVp4l49BQJM5Dy5Y2MsQlxi/jXr8s4wItMTgpQwggFATRz/6fCuVGUz0KRQOaecn1vOV5W323AiIC27VMalwaWRFt8NcyrVqjh1JXNYU7fauru2pXtzzsDT1SHwvcaDVclXyNqljKNFvz50MAu9bzJ8ISHZlQmhC9qKgnYJOuKmLP5FpgjyE18YbZE4WqahkmRDKUSITzs1fnjd6/3CZujnf+zqj/6Hy6Kitkp+zkYmWPR1YAPqEQ9glEiHrcbde6zlvXD9vcnkY9Id6KdXOdVKwtkhm2ipS5chJpugTqEgkDIj1pWLdtImLfwJr1TqhZ55lp6KoKjZXkhOs5Hk+avKDCyVbYeUhwhZ9khy3JMAzF+j0UNSFeYvoobZ9sW1I+tmLnQzd5rXaP/cgPFqR/ZJ9jH+hzDBY6HMAN7iUrwdySohXOolsrkGJCQuFlAikxzfp2NSDRCXsSvGIUljjWNXDLvsl5VtjyOJg1+rAwtYiclvPKAGZf6Skmy8qnUxQJKECygPVSbaDySq+TnOmccfTnmcean/to4+D8keH3yLUfbip79jUwfdTJ4SgucPY5ChwNfb8cPlb+/umTM774rfXA+W3VI0/+dPGlgcAh7+LKV/vvK3b4N/y5ARsuO1TlG7htaP2R+ohzNztl9hs7zmx79GDpJ/gTpcSe7xauWbAflg68sLP+nu6hvf0Hz3KnT2z9o2r3mkXbL/31sfJ58KnD694lNwt3tvxQDuZ1BGZu1fbuOBWtGNj5wfzFh+Gpr0tp2ZC8RdNGnjk+fOTp51u3v9i/3GTUE5vLU7f8PmcXdffx5LnhtcfrHltftlHZOTJ4whj+dQ/69st3TpJnhtpfP3PsLf7tmgfmHCh3Vdw/dHTbnJY3v/9x1+2xBe1ztVnorjvOXqw6d37f8MuXPhv8dMordalFF/Zvin11KVg2klm+vwFAPXPS8BEAAA==';
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api.ebay.com/buy/browse/v1/item/v1|374289166032|0`,
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
