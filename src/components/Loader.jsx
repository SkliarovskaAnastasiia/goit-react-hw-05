import { BeatLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className="loader">
      <BeatLoader color="#747bff" cssOverride={{ display: 'block' }} />
    </div>
  );
}
