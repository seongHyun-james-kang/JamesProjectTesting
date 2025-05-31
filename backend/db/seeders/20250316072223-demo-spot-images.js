'use strict';
const { SpotImage} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate( [
        // Spot 1 – Cozy Apartment
        { spotId: 1, url: 'https://www.constructionspecifier.com/wp-content/uploads/2023/07/ankrom-moisan-mass-timber-building-ai-rendering-1.jpg', preview: true },
        { spotId: 1, url: 'https://www.thespruce.com/thmb/S8tYKXzFhGjDB_X6BHXZyPMhejs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rsw2320h1548-aafef038b55e4ca5ac3f2ed49337971a.jpeg', preview: false },
        { spotId: 1, url: 'https://www.oppeinhome.com/upload/image/product/thumb/20210926/Warm-and-Cozy-Apartment-Design-OP18-HS02-1.jpg', preview: false },
        { spotId: 1, url: 'https://media.designcafe.com/wp-content/uploads/2021/11/08175125/cozy-apartment-living-room.jpg', preview: false },
        { spotId: 1, url: 'https://i.homeadore.com/wp-content/uploads/2024/04/003-chic-cozy-airbnb-apartment-a-modern-stay-in-athens-460x306.jpg', preview: false },
  
        // Spot 2 – Beachfront Condo
        { spotId: 2, url: 'https://cwimages.imgix.net/BuildingImages/Ashworth2023/AW-Ext-03.jpg?auto=compress', preview: true },
        { spotId: 2, url: 'https://media.scurto.net/cdn-cgi/image/width=800/2002/media/648004.jpg', preview: false },
        { spotId: 2, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-555882115149236545/original/fe1b7fa4-c7d6-46c2-b973-dad06799d27c.jpeg', preview: false },
        { spotId: 2, url: 'https://a0.muscache.com/im/pictures/2b71f956-12fe-46e7-8fc8-03cdb19d845c.jpg', preview: false },
        { spotId: 2, url: 'https://images.ctfassets.net/wlzmdirin2hy/7DDgWlIdlnY2lvlOAvW53G/9297e430401dcc0c40fe5afa5a4d4815/LX_Miami33_HOM_Scott_06-scaled.jpg?w=3840&q=75', preview: false },
  
        // Spot 3 – Mountain Cabin
        { spotId: 3, url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071', preview: true },
        { spotId: 3, url: 'https://i.lmpm.com/img/lmpm-company-store-prod/64760d663a928/properties/02f9810b-827d-4b72-9abc-e4e269727dac/mountainsideretreat(74).jpg?w=2048&h=1152&q=60', preview: false },
        { spotId: 3, url: 'https://cdn.liverez.com/5/11273/1/175665/800/1.jpg', preview: false },
        { spotId: 3, url: 'https://escapetoblueridge.icnd-cdn.com/images/blog/LonesomeDoveDusk2.jpg', preview: false },
        { spotId: 3, url: 'https://www.nps.gov/common/uploads/cropped_image/primary/FD2DE9D9-097B-CEA3-C7AE93B399A45EE4.jpg?width=1600&quality=90&mode=crop', preview: false },
        
        // SpotId: 4
        { spotId: 4, url: 'https://rare-gallery.com/uploads/posts/906272-Cyberpunk-2077-building-sunlight-apartments-clouds.png', preview: true },
        { spotId: 4, url: 'https://i.redd.it/rm1ae1fibocc1.jpeg', preview: false },
        { spotId: 4, url: 'https://v.etsystatic.com/video/upload/q_auto/CyberpunkLivingRoom2_preview_watermarked_dmtdob.jpg', preview: false },
        { spotId: 4, url: 'https://i.ytimg.com/vi/5-XmkKxCLbY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAkYf8t1nJDl2EeR5llnJsNUqYHMg', preview: false },
        { spotId: 4, url: 'https://i.ytimg.com/vi/LLBCDkq4QjE/sddefault.jpg', preview: false },
   
      
      ]);
    },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SpotImages", null, {});
  }
};
