export async function GET() {
  return Response.json(
    {
      message: 'GitHub API endpoint',
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
