import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
//import { token } from '../lib/token';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';

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
    'Bearer v^1.1#i^1#f^0#I^3#r^0#p^1#t^H4sIAAAAAAAAAOVYfWwTZRhft64TcZogToLElBOIAe56d+1d22OtKesGla0dtBtsQuB699527D66e69dxwiZQ/ePyF9+f+BMZoSIiUQUkiUoSNQQ0cQgCeggkQgkippgREOIvtd2o5sEkDVxif2nued93uf9/X7v87zvc0f2O2YsHlw5eKXaVlU+1E/2l9ts1ExyhqNyyb0V5XMry8giB9tQ/4J++0DFxVrIq0qKWwNgStcgcGZVRYNczhjA0obG6TyUIafxKoCcKXDxUFMjRxMklzJ0Uxd0BXNGwgGM9VCixw8Yyu8VKK+XRVZtLGZCD2BehuaBX2B9lI+SBIpB4xCmQUSDJq+ZAYwmaRqnSJwmExTLuT2chyEoxt2OOVuBAWVdQy4EiQVzcLncXKMI682h8hACw0RBsGAk1BCPhSLh+mii1lUUK1jQIW7yZhpOfKrTReBs5ZU0uPkyMOfNxdOCACDEXMH8ChODcqExMHcAPy+1mwGCJPCM20+yPokviZQNuqHy5s1xWBZZxKWcKwc0UzZ7b6UoUiO5GQhm4SmKQkTCTutvdZpXZEkGRgCrXx5qCzU3Y8F6sYc3xGgHDnkJiIacwZvXhHHGl+QFkqFEXPAyXuAWmMJC+WgFmSetVKdromyJBp1R3VwOEGowWRu6SBvkFNNiRkgyLUTFfr4xDT3IzzW2i2mzU7P2FahICGfu8dY7MD7bNA05mTbBeITJAzmJAhifSskiNnkwl4uF9MnCANZpminO5erp6SF63IRudLhokqRc65oa40InUFGGZFWr1vP+8q0n4HKOigDQTChzZm8KYcmiXEUAtA4s6GEZ2u0r6D4RVnCy9R+GIs6uiRVRqgrhRW8yyfCiBJJJt0CzpaiQYCFJXRYOkOR7cZU3uoCZUngB4ALKs7QKDFnk3IyEtJEALrJ+Cff4JQlPMiKLUxIAJECIBL/v/1Qot5vqcSAYwCxJrpcsz9sbsjIZS/oyq8VoY6wl3uQPs21a1E0rm5sjXd7u5Zlw97rHPaFVDR2B262GG5KvU2SkTAKtXwoBrFovnQgrdWgCcUr04oKeAs26Igu902uD3YbYzBtmbxwoCjJMiWQolYqU5qwuGb1/eUzcGe/S3VH/0f10Q1bQStnpxcqaD1EAPiUT1g1ECLrqsmpd51H7YZk35lBPibeMOtdpxRqRzLOVxXzLSeToEjAjEAaAetpA3TYRszqwhN4FNHSfmYauKMBopaZcz6qaNvmkAqZbYZcgwWV+ml22FMuytM/N+qZ2HAm5q3TjdDuSSnEU21fcYVvtmviSHyzL/agB2wfkgG1fuc1GusiF1CPkfEdFi73inrlQNgEh8xIB5Q4NvbsagOgCvSleNsodtm1N3Opvij4rDG0g54x/WJhRQc0s+spAzrs+Uknd92A1TVMkTVKs2+Nh2slHro/aqRr77NMnjnY5jp155eTTl/Zc7XtzdxaeOkdWjzvZbJVl9gFbmR46cpd45Kuffp/1zsLzy14YvvbxQ2d/2/rU96uGL1d9vqO+/eqaP8mQbv+lvWr74Oi1Rb70yT615lrg66Wok2nd2fdy+bbs4KF53f5Nm/t+nRXynMseGtr00d6B2kTNt1/+0fZw23Dw7P73wPbwnoqMObJzZM8zj45s6Vwf+fQ54tTw8R9G3n3j4M/df50/cfjA1pZj/a/+ePCtw8uWXVAPYDuCmR3H2Revnttddf8Tuz7xL92wduaS9Y3O6g1HHVdmD34Ya7qw+NL+tpUt7x+re7KWXvz2itcO1Kydb3PMOfPZ0osLXrq89/WtiX2PPbvp9GhiCZNZNPrFlue/e2CuZ2B+YEVd2ekFRB8ZPbpr9O789v0NwLfZ5fARAAA=';
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

        {/*<div>
            <button
              className="mt-5 hover:font-bold hover:text-blue-600 p-4"
              onClick={() => changePicture('right')}
            >
              Next picture
            </button>
          </div>
          <div>
            <button
              className="mt-5 hover:font-bold hover:text-blue-600 p-4"
              onClick={() => changePicture('left')}
            >
              Prev picture
            </button>
          </div>
        </div> */}
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
          className="primary-button mt-5 bg-slate-200 py-3 px-6 rounded-lg hover:bg-blue-400"
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
