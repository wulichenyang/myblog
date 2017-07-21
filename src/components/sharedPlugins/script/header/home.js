'use strict';

angular.module('home', [])
  .controller('homeCtrl', ['$scope', ($scope) => {

    const introDom = document.getElementById('intro-center-wrapper');
    const doveDom = document.getElementById('dove');
    let doveX;
    let doveY;

    introDom.onmouseover = e => {
      doveX = -.03 * (e.offsetX);
      doveY = -.03 * (e.offsetY);

      doveDom.style.transform = `translate3d(${doveX}px, ${doveY}px, 0) rotateZ(${doveY + doveX}deg)`;

    }

  }])