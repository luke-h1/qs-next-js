import Image from "next/image";
import styles from "./PetCard.module.scss";
import { Pet } from "@frontend/types/pet";

type PetCardProps = {
  pet: Pet;
};

const PetCard = ({ pet }: PetCardProps) => {
  return (
    <div className={styles.project} key={pet.id}>
      <div className={styles.background}>
        <div className={styles.imageWrapper}>
          <div className={styles.image}>
            <Image
              src={pet.images[0]}
              sizes="(max-width: 700px) 90vw, 700px"
              width="40"
              height="40"
              alt=""
            />
          </div>
        </div>
      </div>

      <h3 className={styles.title}>Name: {pet.name}</h3>
      <p className={styles.description}>Description: {pet.description}</p>
      <p className={styles.description}>Age: {pet.age}</p>
      <p className={styles.description}>Breed: {pet.breed}</p>
    </div>
  );
};

export default PetCard;
