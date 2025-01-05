// import { useRouter } from 'next/router';
// import animesData from '../../data/animes.json';

// export default function SearchPage() {
//   const router = useRouter();
//   const { query } = router.query;

//   const results = animesData.Animes.filter((anime) =>
//     anime.name.toLowerCase().includes((query || '').toLowerCase())
//   );

//   return (
//     <div>
//       <h1>Resultados para "{query}"</h1>
//       <ul>
//         {results.map((anime) => (
//           <li key={anime.id}>
//             <img src={anime.image} alt={anime.name} width={50} height={75} />
//             {anime.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
