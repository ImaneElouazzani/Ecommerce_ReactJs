import React, {useState, useRef, useEffect} from 'react'
import inventory from "../../data/inventory.js";
import {useParams} from 'react-router-dom'
import './ProductShowcase.css'
import {useDispatch} from 'react-redux'

export default function ProductShowcase() {

  const [nbMugs, setNbMugs] = useState(1);

  const { id } = useParams();

  const productClicked = inventory.findIndex(
    (obj) => obj.title.replace(/\s+/g, "").trim() === id
  );

  const dispatch = useDispatch()
  
  const addingInfo = useRef()

  let timerInfo
  let display = true

  const updateMugs = (e) => {
      setNbMugs(Number(e.target.value))
  }

  const addToCart = e => {
    e.preventDefault()

    const itemAdded = {
      ...inventory[productClicked],
      quantity: nbMugs
    }

    dispatch({
      type: "ADDITEM",
      payload: itemAdded
    })

    addingInfo.current.innerText = "Ajouté au panier"

    if(display){
      display = false
      timerInfo = setTimeout(() => {
        addingInfo.current.innerText = ""
        display = true
      }, 500)
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerInfo)
    }
  }, [])

  return (
    <div className="showcase">
      <div className="container-img-showcase">
        <img
          className="img-showcase"
          src={
            process.env.PUBLIC_URL +
            `/images/${inventory[productClicked].img}.png`
          }
          alt=""
        />
      </div>
      <div className="product-infos">
        <h2>{inventory[productClicked].title}</h2>
        <p>Prix: {inventory[productClicked].price}€</p>
        <form 
          onSubmit={addToCart}
        >
          <label htmlFor="quantity">Quantité</label>
          <input
            type="number"
            id="quanitity"
            value={nbMugs}
            onChange={updateMugs}
          />
          <button>Ajouter au panier</button>
          <span 
          ref={addingInfo}
          className="adding-info"></span>
        </form>
      </div>
    </div>
  )
}
