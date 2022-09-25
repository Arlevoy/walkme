import { Route } from '#modules/routes/domain/route.interface';

export const getRoutesById = (id: number): Route[] => {
  return [
    {
      pointsOfInterest: [
        {
          region: {
            latitude: 48.86162558742782,
            latitudeDelta: 0.18850770649190451,
            longitude: 2.3808150116565927,
            longitudeDelta: 0.1475828137637336,
          },
          title: "L'atelier des Lumières",
          description:
            'Situé entre Bastille et Nation, dans une ancienne fonderie du XIe arrondissement parisien, l’Atelier des Lumières propose des expositions numériques immersives monumentales diffusées en continu. Avec 140 vidéoprojecteurs et une sonorisation spatialisée, cet équipement multimédia unique en son genre épouse 3 300 m² de surfaces, du sol au plafond, avec des murs s’élevant jusqu’à 10 mètres.',
        },
        {
          region: {
            latitude: 48.85829269782787,
            latitudeDelta: 0.18850770649190451,
            longitude: 2.3798557320696117,
            longitudeDelta: 0.1475828137637336,
          },
          title: 'Mairie du 11e',
          description: "C'est juste la mairie",
        },
        {
          region: {
            latitude: 48.862197269529446,
            latitudeDelta: 0.18850770649190451,
            longitude: 2.394183622649873,
            longitudeDelta: 0.1475828137637336,
          },
          title: 'Cimetière du Père Lachaise',
          description:
            'Le cimetière du Père-Lachaise appelé aussi « cimetière de l’Est », est le plus grand cimetière parisien et s’étend sur 43 hectares. Il fait partie des parcs et jardins sous la gestion de la mairie de Paris. C’est un lieu unique qui invite au recueillement et à la rêverie, imprégné d’art, de culture et d’histoire, où l’on voyage à travers ses dédales de pierres et de végétation.',
        },
      ],
    },
  ];
};
