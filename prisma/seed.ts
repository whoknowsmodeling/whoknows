import { db } from '../src/lib/db';
import { mockModels, mockCampaigns, mockHeroSlides, mockClients } from '../src/lib/data';

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await db.campaignImage.deleteMany();
  await db.campaignModel.deleteMany();
  await db.modelImage.deleteMany();
  await db.campaign.deleteMany();
  await db.model.deleteMany();
  await db.heroSlide.deleteMany();
  await db.client.deleteMany();

  // Seed models
  for (const model of mockModels) {
    const createdModel = await db.model.create({
      data: {
        id: model.id,
        name: model.name,
        slug: model.slug,
        gender: model.gender,
        height: (model as any).height || null,
        chest: (model as any).chest || null,
        waist: (model as any).waist || null,
        hips: (model as any).hips || null,
        hair: (model as any).hair || null,
        eyes: (model as any).eyes || null,
        location: model.location || null,
        bio: (model as any).bio || null,
        featured: model.featured,
        order: model.order,
        images: {
          create: model.images.map((img) => ({
            id: img.id,
            imageUrl: img.imageUrl,
            alt: img.alt,
            order: img.order,
            isPrimary: img.isPrimary,
          })),
        },
      },
    });
    console.log(`Created model: ${createdModel.name}`);
  }

  // Seed campaigns
  for (const campaign of mockCampaigns) {
    const createdCampaign = await db.campaign.create({
      data: {
        id: campaign.id,
        title: campaign.title,
        slug: campaign.slug,
        description: campaign.description,
        client: campaign.client,
        year: campaign.year,
        coverImage: campaign.coverImage,
        order: campaign.order,
        models: {
          create: campaign.models.map((m) => ({
            modelId: m.model.id,
          })),
        },
        images: {
          create: campaign.images.map((img) => ({
            id: img.id,
            imageUrl: img.imageUrl,
            alt: img.alt,
            order: img.order,
          })),
        },
      },
    });
    console.log(`Created campaign: ${createdCampaign.title}`);
  }

  // Seed hero slides
  for (const slide of mockHeroSlides) {
    await db.heroSlide.create({
      data: {
        id: slide.id,
        title: slide.title,
        subtitle: slide.subtitle,
        imageUrl: slide.imageUrl,
        link: slide.link,
        order: slide.order,
        active: slide.active,
      },
    });
    console.log(`Created hero slide: ${slide.title || 'Untitled'}`);
  }

  // Seed clients
  for (const client of mockClients) {
    await db.client.upsert({
      where: { id: client.id },
      update: {
        name: client.name,
        logoUrl: client.logoUrl,
        order: client.order,
        active: client.active,
      },
      create: {
        id: client.id,
        name: client.name,
        logoUrl: client.logoUrl,
        order: client.order,
        active: client.active,
      },
    });
    console.log(`Upserted client: ${client.name}`);
  }

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
