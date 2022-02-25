import React, {useState} from 'react'
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
        <form >
          <label htmlFor="quantity">Quantité</label>
          <input
            type="number"
            id="quanitity"
            value={nbMugs}
           
          />
          <button>Ajouter au panier</button>
          <span 
          
          className="adding-info"></span>
        </form>
      </div>
    </div>
  )
}
