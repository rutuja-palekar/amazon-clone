import React, { useEffect, useState } from 'react'
import './Orders.css'
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { auth } from './firebase';


function Orders() {
  const [orderItems, setOrderItems] = useState([]);
  const [orderDetailsLoading, setOrderDetailsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const retrieveOrders = async () => {
      try {
        const db = getFirestore();
        const currentUser = auth.currentUser;

        if (currentUser) {
          const userUID = currentUser.uid
          const retrieveOrdersRef = collection(db, 'users', userUID, 'orders')

          const querySnapshot = await getDocs(retrieveOrdersRef);

          const ordersData = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          setOrderItems(ordersData);
        }
      }
      catch (error) {
        console.error("Error fetching orders from firebase:", error)
      }
      finally {
        setOrderDetailsLoading(false)
      }
    }
    retrieveOrders()
  }, [])

  const filteredOrderItems = orderItems.filter((item) =>
    item.items.some((orderItem) =>
      orderItem.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (orderDetailsLoading) {
    return (
      <div className="orderDetailsLoaderWrapper">
        <span className='orderDetailsLoader'></span>
      </div>
    )
  }

  const searchIconStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bolder'
  }

  const calculateOrderTotalHandler = (items) => {
    const total = items.reduce((acc, item) => acc + item.price, 0);
    const localStringTotal = total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
    return localStringTotal
  };


  return (
    <div className="ordersMainWrapper">

      <section className="ordersHeadingSearchBarWrapper">
        <h1 className="ordersHeading">Your Orders</h1>

        <label className="searchBarContainer">
          <SearchIcon style={searchIconStyle} />
          <input type="text" className="ordersSearchBarInput" placeholder='Search all orders' value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
        </label>

        <button className="ordersSearchBtn">Search Orders</button>

      </section>
      <hr className="ordersHeadingBottomLine" />

      {filteredOrderItems.map((item, index) => (
        <section className="orderItemsWrapper" key={index}>

          <div className="orderDetailsWrapper">
            <div className="ordersDetailsHeader">


              <div className="orderPlacedDetailsContainer">
                <p className="orderPlacedDetailsTitle">Order placed</p>
                <p className="orderPlacedDetails">
                  {item.timestamp
                    ? new Date(item.timestamp.seconds * 1000).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      timeZone: 'Asia/Kolkata',
                    })
                    : 'No date available'}
                </p>
              </div>

              <div className="orderPlacedDetailsContainer">
                <p className="orderPlaceDetailsTotalTitle">Total</p>
                <p className="orderPlaceDetailsTotal">{calculateOrderTotalHandler(item.items)}</p>
              </div>

              <div className="orderPlacedDetailsContainer">

                <p className="orderPlaceDetailsNameTitle">Ship To</p>
                {item.address && item.address.address1 && (
                  <p className="orderPlaceDetailsName">{item.address.address1.addFullName}</p>
                )}
                {item.address && item.address.address2 && (
                  <p className="orderPlaceDetailsName">{item.address.address2.addFullName}</p>
                )}
                {item.address && item.address.address3 && (
                  <p className="orderPlaceDetailsName">{item.address.address3.addFullName}</p>
                )}
                {item.address && item.address.address4 && (
                  <p className="orderPlaceDetailsName">{item.address.address4.addFullName}</p>
                )}
                {item.address && item.address.address5 && (
                  <p className="orderPlaceDetailsName">{item.address.address5.addFullName}</p>
                )}

              </div>

            </div>

            {item.items.map((orderItem, itemIndex) => (
              <div className='orderDetailsImgTitleWrapper' key={itemIndex}>
                <img src={orderItem.image} alt="Item" className="retrieveImg" />
                <p className="orderPlaceTitle">{orderItem.title}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default Orders
