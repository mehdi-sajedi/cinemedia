import styles from './ShowsServiceItem.module.scss';
import { ShowFilterData } from '../../../features/shows/showTypes';
import { imageBase } from '../../../data/imagePaths';

interface ShowsServiceItemProps {
  formData: ShowFilterData;
  setFormData: React.Dispatch<React.SetStateAction<ShowFilterData>>;
  id: number;
  name: string;
  img: string;
  state: number[];
  stateStr: string;
}

const ShowsServiceItem = ({
  formData,
  setFormData,
  id,
  name,
  state,
  stateStr,
  img,
}: ShowsServiceItemProps) => {
  const toggleService = () => {
    let newState;

    // If item not already in list, add item
    if (!state.includes(id)) newState = [...state, id];
    // If item already in list, remove item
    else newState = state.filter((x) => x !== id);

    setFormData({
      ...formData,
      [stateStr]: newState,
    });
  };

  return (
    <li className={styles.listItem}>
      <button
        type='button'
        onClick={toggleService}
        className={state.length > 0 && !state.includes(id) ? styles.fade : ''}
        aria-pressed={state.includes(id)}
        aria-label={name}
      >
        <img src={`${imageBase}original${img}`} loading='lazy' alt='' />
      </button>
    </li>
  );
};

export default ShowsServiceItem;
