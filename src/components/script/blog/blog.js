angular.module('blog', [])
  .controller('blogCtrl', ['$scope', ($scope) => {
    $scope.artInfo = [
      {
        router: '',
        artImg: '/blog/art-1.jpg',
        artTitle: 'The Starry Night',
        artIntro: 'Tuesday Night, has been translated into The Starry Night (The Starry Night) after (Dutch: De sterrennacht) is a Dutch impressionist painter Vincent van gogh in France in 1889, in a mental hospital st remy creation of a famous painting, is one of The representative work of van gogh, courtesy of The museum of modern art in New York. There is a general saying that because this is van gogh\'s work in the period of mental illness, it is widely believed to be a wonderful scene van gogh imagined.',
        artistImg: '/blog/artist-1.png',
        artistName: 'Vincent Willem van Gogh'
      },
      {
        router: '',
        artImg: 'https://nodecasts.io/wp-content/themes/sparkling-child/featured_courses/learn_es6.jpg',
        artTitle: 'Introduction to Arts',
        artIntro: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio tenetur, maxime nulla doloribus explicabo quidem facere reiciendis aliquid, quod sit odit. Quod, minus ipsum consectetur qui saepe doloremque hic sequi.',
        artistImg: 'https://nodecasts.io/wp-content/themes/sparkling-child/featured_courses/Gew7gVjsRNOrs9M5xRri.jpeg',
        artistName: 'Davincy Namea'
      },
      {
        router: '',
        artImg: 'https://nodecasts.io/wp-content/themes/sparkling-child/featured_courses/learn_es6.jpg',
        artTitle: 'Introduction to Arts',
        artIntro: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio tenetur, maxime nulla doloribus explicabo quidem facere reiciendis aliquid, quod sit odit. Quod, minus ipsum consectetur qui saepe doloremque hic sequi.',
        artistImg: 'https://nodecasts.io/wp-content/themes/sparkling-child/featured_courses/Gew7gVjsRNOrs9M5xRri.jpeg',
        artistName: 'Davincy Namea'
      },
      {
        router: '',
        artImg: '/blog/art-4.jpg',
        artTitle: 'Le Bassinaux Nympheas',
        artIntro: 'Monet is the pioneer of creating a dynamic artistic conception. He serene, classic series of water lily paintings, with their dreamy atmosphere and life.',
        artistImg: '/blog/artist-4.png',
        artistName: 'Claude Monet'
      },
      {
        router: '',
        artImg: '/blog/art-5.jpg',
        artTitle: 'In the red woman sleeping in an easy chair',
        artIntro: '"The woman sleeping in a red arm-chair" is a silhouette of a woman, and is placed in front of a red background.The woman\'s limb did not break down more, slightly exaggerated.The colour is also extremely simple.',
        artistImg: '/blog/artist-5.png',
        artistName: 'Pablo Picasso'
      },
      {
        router: '',
        artImg: 'https://nodecasts.io/wp-content/themes/sparkling-child/featured_courses/learn_es6.jpg',
        artTitle: 'Introduction to Arts',
        artIntro: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio tenetur, maxime nulla doloribus explicabo quidem facere reiciendis aliquid, quod sit odit. Quod, minus ipsum consectetur qui saepe doloremque hic sequi.',
        artistImg: 'https://nodecasts.io/wp-content/themes/sparkling-child/featured_courses/Gew7gVjsRNOrs9M5xRri.jpeg',
        artistName: 'Davincy Namea'
      },
    ]
  }])