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
        artImg: '/blog/art-2.jpg',
        artTitle: 'Girl with a Pearl Earring',
        artIntro: 'The glimpse of the girl in the painting seemed to have absorbed the soul of the viewer. Vermeer used the whole black background in this painting, which made a very strong three-dimensional effect. Black background Foil The charm of the girl\'s image, so that she is like a lamp in the dark, dazzling.',
        artistImg: '/blog/artist-2.png',
        artistName: 'Johannes Vermeer'
      },
      {
        router: '',
        artImg: '/blog/art-3.jpg',
        artTitle: 'Introduction to Arts',
        artIntro: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio tenetur, maxime nulla doloribus explicabo quidem facere reiciendis aliquid, quod sit odit. Quod, minus ipsum consectetur qui saepe doloremque hic sequi.',
        artistImg: '/blog/artist-3.png',
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
        artImg: '/blog/art-6.jpg',
        artTitle: 'Lafemmeauchapeau',
        artIntro: 'The work depicts a woman in colourful clothes and a bowler hat, and the woman in the painting is the archetype of Matisse\'s wife. Matisse on the basis of realism on the most impulsive attempts, with a variety of colorful paint on the woman\'s face. He gradually understood that gorgeous color can restore the passion of life, evoke people\'s desires, sublimation to the ideal realm full of happiness.',
        artistImg: '/blog/artist-6.png',
        artistName: 'Henri Matisse'
      },
    ]
  }])