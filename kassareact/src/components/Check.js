// import styles from "./Check.module.css";

function Check(props) {
  const { purchases } = props;
  console.log(purchases);

  return (
    <div className="check-container">
      <h2>Мои покупки</h2>
      <ol>
        {purchases.map((purchase) => (
          <li>{purchase.title}</li>
        ))}
      </ol>
    </div>
  );
}

export default Check;
