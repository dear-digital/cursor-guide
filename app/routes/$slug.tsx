import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {client} from '~/lib/sanity'
import {PortableText} from '@portabletext/react'

export async function loader({params}: {params: {slug: string}}) {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    {slug: params.slug}
  )

  if (!page) {
    throw new Response('Not Found', {status: 404})
  }

  return json({page})
}

export default function Page() {
  const {page} = useLoaderData<typeof loader>()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
      <div className="prose max-w-none">
        <PortableText value={page.content} />
      </div>
    </div>
  )
} 