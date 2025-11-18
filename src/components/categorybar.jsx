import "./categorybar.css";


export default function CategoryBar({showicons=true ,variant="home"}) {
  const categories = [
    { name: "Minutes", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/e00302d428f5c7be.png?q=100", hasDropdown: false },
    { name: "Mobiles & Tablets", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/5f2ee7f883cdb774.png?q=100", hasDropdown: false },
    {
      name: "Fashion",
      icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/ff559cb9d803d424.png?q=100",
      hasDropdown: true,
      items: ["T-Shirts", "Shirts", "Jeans", "Shoes", "Watches"],
    },
    {
      name: "Electronics",
      icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/af646c36d74c4be9.png?q=100",
      hasDropdown: true,
      items: ["Mobiles", "Laptops", "Tablets", "Cameras", "Speakers"],
    },
    {
      name: "Home & Furniture",
      icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/1788f177649e6991.png?q=100",
      hasDropdown: true,
      items: ["Furniture", "Kitchen", "Decor", "Lighting"],
    },
    {
      name: "TVs & Appliances",
      icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/e90944802d996756.jpg?q=100",
      hasDropdown: true,
      items: ["Televisions", "Air Conditioners", "Refrigerators", "Washing Machines"],
    },
    { name: "Flight Bookings", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/3c647c2e0d937dc5.png?q=100", hasDropdown: false },
    { name: "Beauty, Food, Toys", icon: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/b3020c99672953b9.png?q=100", hasDropdown: false },
    { name: "Grocery", icon: "https://hips.hearstapps.com/hmg-prod/images/healthy-groceries-bag-66eaef810acf6.jpg?crop=0.7501082719792118xw:1xh;center,top&resize=1200:*", hasDropdown: false },
  ];

  return (
    <div className={ `category-menu ${variant}-bar`}>
      {categories.map((cat) => (
        <div className="category-item" key={cat.name}>
          {showicons && <img src={cat.icon} alt={cat.name} className="category-icon" />}
          <div className="category-name">
            {cat.name}
            {cat.hasDropdown && <span className="arrow">▼</span>}
          </div>

          {cat.hasDropdown && (
            <div className="dropdown-menu2">
              {cat.items.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
