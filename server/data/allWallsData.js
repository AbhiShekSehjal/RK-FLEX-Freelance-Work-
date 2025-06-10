// import wallsImages from "../models/wallsImagesModel.js";
import wallsImages from "../models/wallsImagesModel.js";

// const img1 = await wallsImages.create({ url: "https://images.unsplash.com/photo-1585155777344-149c52cfd5c3?auto=format&fit=crop&w=800&q=80", altText: "img1" })

const WallsData = [
    {
        wallName: "Elegant Grey Marble",
        wallPrice: 1599,
        wallRating: 4.6,
        wallDiscription: "A luxurious marble-style wallpaper that adds elegance to any room. Perfect for living rooms and hallways.",
        wallColorType: "Grey",
        wallDesignType: "Marble",
        wallRoomType: "Living Room",
        wallImages: [
            {
                url: "https://images.unsplash.com/photo-1585155777344-149c52cfd5c3?auto=format&fit=crop&w=800&q=80",
                altText: "Elegant Grey Marble img"
            },
            {
                url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
                altText: "Elegant Grey Marble img"
            },
            {
                url: "https://images.unsplash.com/photo-1570129477490-78865e233533?auto=format&fit=crop&w=800&q=80",
                altText: "Elegant Grey Marble img"
            },
        ]
    },
    {
        wallName: "Classic Blue Damask",
        wallPrice: 1299,
        wallRating: 4.4,
        wallDiscription: "A timeless blue damask wallpaper that brings sophistication to bedrooms and studies.",
        wallColorType: "Blue",
        wallDesignType: "Damask",
        wallRoomType: "Bedroom",
        wallImages: [
            {
                url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
                altText: "Classic Blue Damask img"
            },
            {
                url: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=80",
                altText: "Classic Blue Damask img"
            },
            {
                url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
                altText: "Classic Blue Damask img"
            }
        ]
    },
    {
        wallName: "Warm Sunset Stripes",
        wallPrice: 899,
        wallRating: 4.2,
        wallDiscription: "Vibrant striped wallpaper in warm tones that energizes kitchens and dining areas.",
        wallColorType: "Orange",
        wallDesignType: "Stripes",
        wallRoomType: "Kitchen",
        wallImages: [
            {
                url: "https://images.unsplash.com/photo-1534844629607-53000af1b4c6?auto=format&fit=crop&w=800&q=80",
                altText: "Warm Sunset Stripes img"
            },
            {
                url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
                altText: "Warm Sunset Stripes img"
            },
            {
                url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
                altText: "Warm Sunset Stripes img"
            }
        ]
    },
    {
        wallName: "Soft Lavender Floral",
        wallPrice: 1399,
        wallRating: 4.7,
        wallDiscription: "Delicate lavender floral wallpaper that creates a calming ambiance for bedrooms and reading nooks.",
        wallColorType: "Purple",
        wallDesignType: "Floral",
        wallRoomType: "Bedroom",
        wallImages: [
            {
                url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
                altText: "Soft Lavender Floral img"
            },
            {
                url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
                altText: "Soft Lavender Floral img"
            },
            {
                url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80",
                altText: "Soft Lavender Floral img"
            }
        ]
    },
    {
        wallName: "Rustic Wood Planks",
        wallPrice: 1799,
        wallRating: 4.8,
        wallDiscription: "Rustic wooden plank wallpaper that adds warmth and texture to cabin-style living rooms and dens.",
        wallColorType: "Brown",
        wallDesignType: "Wood",
        wallRoomType: "Living Room",
        wallImages: [
            {
                url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
                altText: "Rustic Wood Planks img"
            },
            {
                url: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=800&q=80",
                altText: "Rustic Wood Planks img"
            },
            {
                url: "https://images.unsplash.com/photo-1505232070786-37a6dd1b8ec8?auto=format&fit=crop&w=800&q=80",
                altText: "Rustic Wood Planks img"
            }
        ]
    },
];

export default WallsData;