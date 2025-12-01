import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export function GET() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
        fontSize: 180,
        letterSpacing: -2,
        fontWeight: 700,
        textAlign: 'center',
        fontFamily: 'Segoe UI',
      }}>
      <div
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
          backgroundClip: 'text',
          color: 'transparent',
        }}>
        What
      </div>
      <div
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))',
          backgroundClip: 'text',
          color: 'transparent',
        }}>
        do
      </div>
      <div
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgb(255, 77, 77), rgb(249, 203, 40))',
          backgroundClip: 'text',
          color: 'transparent',
        }}>
        we
      </div>
      <div
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgb(255, 77, 77), rgb(23, 53, 323))',
          backgroundClip: 'text',
          color: 'transparent',
        }}>
        eat?
      </div>
    </div>,
    {
      width: 1920,
      height: 1080,
    },
  );
}
