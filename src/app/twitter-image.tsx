import { ImageResponse } from '@vercel/og';
import { seo } from '@/content/seo';

export const runtime = 'nodejs';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: '#000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontFamily: 'Fraunces',
        }}
      >
        {seo.title}
      </div>
    ),
    {
      width: 506,
      height: 506,
    }
  );
}
