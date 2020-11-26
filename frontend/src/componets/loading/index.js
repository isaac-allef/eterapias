import loadingImage from './img/logo.svg';
import './style.css';

export default function Loading() {
  return (
    <img src={loadingImage} className="loading-image" alt="logo" />
  );
}
