import { getVehicles } from '@tesla-web/lib/state';

async function getData() {
  const data = await getVehicles()
  return data;
}


export default async function Page() {
  const data = await getData();

  const stats = [
    { id: 1, name: 'API Version', value: data.response[0].api_version, bgColor: 'bg-slate-400', textColor: 'text-gray-50', subTextColor: 'text-gray-200' },
    { id: 2, name: 'HVAC', value: 'Off', bgColor: 'bg-slate-400', textColor: 'text-gray-50', subTextColor: 'text-gray-200'},
    { id: 3, name: 'State', value: data.response[0].state, bgColor: 'bg-slate-400', textColor: 'text-gray-50', subTextColor: 'text-gray-200' },
    { id: 4, name: 'Trunk', value: 'Closed', bgColor: 'bg-slate-400', textColor: 'text-gray-50', subTextColor: 'text-gray-200' }
  ]
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Commands
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Car state is displayed below for ID: {`${data.response[0].id}`}
            </p>
          </div>
          <dl key={`commands-list-${data.response[0].id}`} className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <button key={`btn-${stat.id}`} type='button'>
                <div key={stat.id} className={`flex flex-col ${stat.bgColor? stat.bgColor: 'bg-gray-200'} p-8`}>
                  <dt className={`text-sm font-semibold leading-6 ${stat.subTextColor? stat.subTextColor: 'text-slate-950'}`}>{stat.name}</dt>
                  <dd className={`order-first text-3xl font-semibold tracking-tight ${stat.textColor? stat.textColor: 'text-slate-950'}`}>{stat.value}</dd>
                </div>
              </button>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}


export const revalidate = 100;
export const runtime = 'edge';