import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function EbayItem() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [post, setPost] = useState({});
  //https://api.ebay.com/buy/browse/v1/item/v1|374289166032|0
  //'https://jsonplaceholder.typicode.com/posts/1',
  //{loading ? 'Loading' : post.title}
  //{error ? error : null}
  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://api.ebay.com/buy/browse/v1/item/v1|374289166032|0',
      headers: {
        Authorization:
          'Bearer v^1.1#i^1#r^0#p^1#I^3#f^0#t^H4sIAAAAAAAAAOVYf2wTVRxft24wYEMTBAP+qDcWE8xd3931+uNcG9p1Y8VtXWm3wBIh9+Ndd9v1rty9bqsK1KkYEyWBPyBKlBmFGBIxxkAkBONixB+JxhiRmKAmCEriH6L82KJAvGvL6CYBZE1cYv9p3vd93/d9Pp/3/b737oFcTe2KrW1bx+tscypHcyBXabOR80FtTfUj9VWVS6srQImDbTS3PGcfqTrbZHApJc2ugUZaUw3oGE4pqsHmjX4so6usxhmywapcChosEth4sKOdpQjApnUNaYKmYI5I2I9JlMADwQNoXnQxAuMxreq1mAnNj4k0B31AIjmB9ki8hzL7DSMDI6qBOBX5MQpQFE4CHHgSFM0CkmVogvK4ejFHD9QNWVNNFwJggTxcNj9WL8F6c6icYUAdmUGwQCTYGo8GI+GWzkSTsyRWoKhDHHEoY0xtNWsidPRwSgbefBoj783GM4IADQNzBgozTA3KBq+BuQP4Bal5mhG9jE/yiAJgxPJI2arpKQ7dHIdlkUVcyruyUEUyyt5KUVMNvh8KqNjqNENEwg7rL5bhFFmSoe7HWkLBdcGuLizQIg5xutiZxA1OgqIuD+Jda8I44+U5kykp4oKH8UBaYIoTFaIVZZ42U7OmirIlmuHo1FAImqjhVG0olinRxnSKqlE9KCEL0aSfN2EKWNTQTfZai1pYxQzqU611hSlTCEe+eesVmByNkC7zGQQnI0zvyEvkx7h0Whax6Z35XCymz7Dhx/oQSrNO59DQEDFEE5qedFIAkM61He1xoQ+mOMz0tWq94C/fegAu56kI0BxpyCzKpk0sw2aumgDUJBZwuRmK9hZ1nworMN36D0MJZ+fUiihXhVA+F08KtJf30rTb5xLLUSGBYpI6LRyQ57J4itMHIEornABxwcyzTArqssjSjGRqI0FcdPsk3OWTJJxnRDdOShACCHle8Hn/T4Vyu6keh4IOUVlyvWx53ts6LIMo7x2MiZ3t0e54hy/sXqd20pTS3xUZ8GwMDYY3rl3tCj7WmvTfbjXckHyzIpvKJMz5yyGAVevlE6FNMxAUZ0QvLmhp2KUpspCdXQtM62IXp6NsHCqKaZgRyWA6HSnPXl02ev9ym7gz3uU7o/6j8+mGrAwrZWcXK2u8YQbg0jJhnUCEoKWcVq1rnHn9sMwb8qhnxFs2b66zirVJssBWFgtXTiJPlzAGBUKHhpbRzds2EbVuYAltAKrmeYZ0TVGg3kPOuJ5TqQzieAXOtsIuQ4LL3Cw7bEm3myG9tIekZ8RLyB+lG2bbllSOrdi+6g6v1c6pH/mBivyPHLEdBCO2dyttNuAEjWQDeKimqttetWCpISNIyJxEGHJSNb9ddUgMwGyak/XKGtvmDjZ2vORZYfRxcO/kw0JtFTm/5JUB3He9p5pcuKSOokgAPBQNSIbuBQ3Xe+3kYvui7mevXF4Ui+98+8PQe0867v7p57Ef3aBu0slmq66wj9gq6l54qy26OdizI/Znbt6p02v2rHzi0pJXl61P6ce+m/ikY1n72nHC/WUjs7ch0tL4fdQdTx4f++zRb2nu4tVN23xgfNv+M31Hj/R614eunKnfM1z5/u+huw4ufLHx84m+7Lk/du89cX7eudDFT+3vHOvfiK3cv3STY2772LmrF56qVTYdfiODlsdePjB0+Kvzh+bYd1RRH+sTH9QkToLkKn3nxcbdL4VjW/jn28VvumMPLtt75PKW+l27frj02i9/9X/xZnRf7jnl9PmmC4t3rNj39dztg5kjbQfuP/XAPds3iHvQSfj604fqMq/UN3x0tOm3Z1bP/fV0M352vOKhA02LtAVjo419Ew/75BNbRgrL9zd5Xz0q8BEAAA==',
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
          <img
            src={post.image.imageUrl}
            alt={post.image.imageUrl}
            className="rounded shadow"
            class="w-96 h-96"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={'/catalog/5'}>
          <a>
            <h2 className="text-lg">{post.title}</h2>
          </a>
        </Link>
        <p className="mb-2">{'Placeholder text'}</p>
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
