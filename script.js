function sequence_animation() {
   
    const canvas = document.querySelector('#home>canvas');
    const context = canvas.getContext('2d');
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    window.addEventListener('resize', function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    });
  
    function files(index) {
      return `ezgif-frame-${(index + 1).toString().padStart(3, '0')}.png`;
  }
  
    const frameCount = 40;
  
    const images = [];
    const imageSeq = {
      frame: 0,
    };
  
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = files(i);
      images.push(img);
    }
  
    gsap.to(imageSeq, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        start: 'top 0%', // Set start to 50% from the top
        scrub: 1.8,
        pin: true,
        trigger: '#home',
        markers:true
      },
      onUpdate: render,
    });
  
    images[0].onload = render;
  
    function render() {
      scaleImage(images[imageSeq.frame], context);
    }
  
    function scaleImage(img, ctx) {
      var canvas = ctx.canvas;
      var hRatio = canvas.width / img.width;
      var vRatio = canvas.height / img.height;
      var ratio = Math.max(hRatio, vRatio);
      var centerShift_x = (canvas.width - img.width * ratio) / 2;
      var centerShift_y = (canvas.height - img.height * ratio) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    }
    gsap.to('#home canvas',{
      y: 0, // Keep canvas at top
      scrollTrigger:{
        scrub:true,
        trigger:'#home',
        start: 'top 50%' // Set start to 50% from the top
      }
    })
  }
  
  sequence_animation();