import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "npm:@blinkdotnew/sdk";

const blink = createClient({
  projectId: 'ai-brand-photo-kit-mobile-app-bdzebemr',
  authRequired: false
});

interface GeneratePhotosRequest {
  photos: string[];
  packageType: string;
  userId: string;
}

interface PhotoCategory {
  lifestyle: string[];
  desk: string[];
  speaking: string[];
  zoom: string[];
  linkedin: string[];
  instagram: string[];
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  try {
    const { photos, packageType, userId }: GeneratePhotosRequest = await req.json();

    if (!photos || photos.length !== 5) {
      return new Response(JSON.stringify({ error: 'Exactly 5 photos required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Set user token for Blink SDK
    const authHeader = req.headers.get('authorization');
    if (authHeader) {
      blink.auth.setToken(authHeader.replace('Bearer ', ''));
    }

    const generatedPhotos: PhotoCategory = {
      lifestyle: [],
      desk: [],
      speaking: [],
      zoom: [],
      linkedin: [],
      instagram: []
    };

    // Generate lifestyle photos
    console.log('Generating lifestyle photos...');
    for (let i = 0; i < 3; i++) {
      const { data } = await blink.ai.modifyImage({
        images: [photos[i % photos.length]],
        prompt: `Transform this person into a professional lifestyle photo. Show them in a modern, well-lit environment with natural lighting. They should look confident and approachable, wearing business casual attire. The background should be clean and professional, suitable for a personal brand website or LinkedIn profile. High quality, professional photography style.`,
        quality: 'high',
        n: 1
      });
      
      if (data && data[0]?.url) {
        generatedPhotos.lifestyle.push(data[0].url);
      }
    }

    // Generate desk/workspace scenes
    console.log('Generating desk scenes...');
    for (let i = 0; i < 2; i++) {
      const { data } = await blink.ai.modifyImage({
        images: [photos[(i + 1) % photos.length]],
        prompt: `Create a professional workspace photo of this person. Show them working at a modern desk with a laptop, in a clean office environment. They should look focused and professional, wearing business attire. Include elements like a coffee cup, notebook, or plants to make it feel authentic. Professional lighting and composition.`,
        quality: 'high',
        n: 1
      });
      
      if (data && data[0]?.url) {
        generatedPhotos.desk.push(data[0].url);
      }
    }

    // Generate public speaking photos
    console.log('Generating speaking photos...');
    for (let i = 0; i < 2; i++) {
      const { data } = await blink.ai.modifyImage({
        images: [photos[(i + 2) % photos.length]],
        prompt: `Transform this person into a professional public speaking photo. Show them presenting or speaking confidently, wearing professional business attire. They should appear engaging and authoritative, with good posture and confident body language. The background should suggest a conference or professional speaking environment. High-quality professional photography.`,
        quality: 'high',
        n: 1
      });
      
      if (data && data[0]?.url) {
        generatedPhotos.speaking.push(data[0].url);
      }
    }

    // Generate Zoom call mockups
    console.log('Generating Zoom mockups...');
    for (let i = 0; i < 2; i++) {
      const { data } = await blink.ai.modifyImage({
        images: [photos[(i + 3) % photos.length]],
        prompt: `Create a professional video call headshot of this person. Show them from chest up, looking directly at the camera with a friendly, professional expression. They should be wearing business attire with good lighting on their face. The background should be clean and professional, suitable for video calls. Perfect for Zoom, Teams, or other video conferencing platforms.`,
        quality: 'high',
        n: 1
      });
      
      if (data && data[0]?.url) {
        generatedPhotos.zoom.push(data[0].url);
      }
    }

    // Generate LinkedIn banners
    console.log('Generating LinkedIn banners...');
    for (let i = 0; i < 2; i++) {
      const { data } = await blink.ai.generateImage({
        prompt: `Create a professional LinkedIn banner design featuring a confident business professional. The design should be modern and clean with a professional color scheme (blues, grays, whites). Include subtle geometric patterns or gradients. The layout should have space for text overlay. Professional, corporate, and trustworthy aesthetic. 1584x396 aspect ratio.`,
        size: '1792x1024',
        quality: 'high',
        n: 1
      });
      
      if (data && data[0]?.url) {
        generatedPhotos.linkedin.push(data[0].url);
      }
    }

    // Generate Instagram bio visuals
    console.log('Generating Instagram visuals...');
    for (let i = 0; i < 2; i++) {
      const { data } = await blink.ai.generateImage({
        prompt: `Create a modern Instagram bio visual template with a clean, professional design. Use a trendy color palette with gradients or modern typography. The design should be suitable for coaches, freelancers, and content creators. Include space for personal branding elements. Square format, Instagram-ready, professional yet approachable aesthetic.`,
        size: '1024x1024',
        quality: 'high',
        n: 1
      });
      
      if (data && data[0]?.url) {
        generatedPhotos.instagram.push(data[0].url);
      }
    }

    // Store the generated photos in the database
    await blink.db.brandKits.create({
      userId,
      packageType,
      originalPhotos: photos,
      generatedPhotos: JSON.stringify(generatedPhotos),
      createdAt: new Date().toISOString(),
      status: 'completed'
    });

    return new Response(JSON.stringify({
      success: true,
      photos: generatedPhotos,
      message: 'Brand kit generated successfully!'
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('Error generating photos:', error);
    return new Response(JSON.stringify({
      error: 'Failed to generate photos',
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
});