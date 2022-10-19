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
    'Bearer v^1.1#i^1#f^0#I^3#p^1#r^0#t^H4sIAAAAAAAAAOVYa2wUVRTudtvKGxKhmEbJdrRqgJm9M7Ozj4Fd3b7CKt0tbMG2PJp53N1OOzuznXu37ZoItSgJMShGRMIPU/gDDYb4AFHUaKTqD/1hYngkPBSjiTGAkKAVjcSZ6VK2lQDSTWzi/tnMueee+33fOefeOwP6yqYu3Lxs8/BMxz3FA32gr9jhoKeDqWWli2Y5iytKi0Ceg2Og76G+kn7nT0uRkFLT/EqI0rqGoKs3pWqIt41BImNovC4gBfGakIKIxxIfDzcs5xkK8GlDx7qkq4QrUhskEqzgESEn+2SPR4YsbVq16zGb9CDhkb2iyHI+r8SIHkn0m+MIZWBEQ1jQcJBgAMOQNCDpQBMAvMfPsyxFM/5WwrUaGkjRNdOFAkTIhsvbc408rLeGKiAEDWwGIUKRcH08Fo7U1kWblrrzYoVyOsSxgDNo7FONLkPXakHNwFsvg2xvPp6RJIgQ4Q6NrDA2KB++DuYu4NtSCxzj9bBMICD6hIDsLYiS9bqREvCtYVgWRSYTtisPNazg7O0ENcUQO6CEc09RM0Sk1mX9rcgIqpJQoBEk6qrDLeHGRiJUJ/cIhhxNkkhIQNlQusnGlbUk5xcFCXC0TEo+zgdZicstNBItp/K4lWp0TVYszZArquNqaKKG47Vh87QxnWJazAgnsIUo34+5riHta7VyOpLEDG7XrLTClCmEy368fQZGZ2NsKGIGw9EI4wdsicxUp9OKTIwftEsxVz29KEi0Y5zm3e6enh6qh6V0I+lmAKDdzQ3L41I7TAmE5Wv1uu2v3H4CqdhUJGjORAqPs2kTS69ZqiYALUmEPF6OYf053cfCCo23/sOQx9k9tiEK1SB+IMuSh5Mkr4+DUBYK0SGhXJG6LRxQFLJkSjA6IU6rggRJyayzTAoaisyzXMLUJgFJ2RtIkJ5AIkGKnOwl6QSEAEJRlAL+/1Oj3Gmpx6FkQFyYWi9UnbfW9yogJvq7V8jR5bFV8YZArbdFi7KM2tEY6fR1VXfXdjU/4Qk/WZ8M3mk33JR8jaqYyjSZ6xdEAKvXCybCMh1hKE+IXlzS07BRVxUpO7kSzBpyo2DgbByqqmmYEMlwOh0p0F5dKHr/cpu4O94FPKP+m/PppqyQVbKTi5U1H5kBhLRCWScQJekpt271umBePyxzm416QrwV8+I6qVibJEfYKvLIlZPSLboU6pYoAyI9Y5iXbSpm3cCa9E6omecZNnRVhcZqesL9nEplsCCqcLI1dgEKXBEm2WFLe71e2mPuS+yEeEn2Udo22bakgmzFJfV3d612j33HDxXZP7rfcQj0O94qdjiAG1TRD4LKMueqEueMCqRgSClCgkJKUjNfXQ1IdcJsWlCM4jLHhgZ+xbG8rwoD68B9o98Vpjrp6XkfGcD9N0ZK6dnzZzIMDegAAB4/y7aCB2+MltDlJXOflRKHYVvbp8OnZ6x9YDB15NVdF+rAzFEnh6O0qKTfUTTvpYs7fc3rntrnf+X3a3t2rGmDPUfnJ+duO/5u+fGz59q7F0lLOk+cPV/z8F+bDg3+eG9/xZbFLVVT9u9s+Ca7p3Tzydd+W4M++x59N2P48c8r/c0HXoTZ8m27rl6au/2jY+cO/lmx9vU5Jy9WVYiDVy59semNrQn/I+eOdxwpn3Wo69ujU35+/+VrFx472F9z+pktv145tnLIqSWHX9C/3NHyzsaq99ZzlUOV5z/eeBgMrme3Llg3bf/CM9h54vlpn3xw/tF4716yLrYru5e6em3300tPLea+OnDycpL+4VTXh1T7c3O6OhbvvnxqiTFn3sAGMDTfH638pVNr/WNK5dcXhvYd3X5m9qzomwuYePXbI+n7G4pHVnvvEQAA';
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
