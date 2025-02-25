import { BeatLoader } from 'react-spinners';

export default function Loader() {
  return (
    <BeatLoader
      color="#747bff"
      cssOverride={{ display: 'block', margin: '0 auto' }}
    />
  );
}
