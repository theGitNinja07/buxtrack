import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../services/api'
import { BaseResponse } from '../types/BaseResponse'
import Loader from '../components/Loader'

const Home: React.FC = (): React.ReactElement => {
  const queryFn = async () => {
    const res = await api.get<BaseResponse<Array<{ name: string; age: number }>>>('/test')
    return res.data
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ['test'],
    queryFn
  })

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <>Errrr!!</>
  }

  return (
    <main className="px-8 mx-auto max-w-screen-2xl">
      <div className="my-8">
        <h1 className="text-2xl font-semibold">Hello, User</h1>
      </div>
      <div>
        {data?.data.map((item) => {
          return (
            <>
              <div>
                {item.name} - {item.age}
              </div>
              <br />
            </>
          )
        })}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis accusantium deleniti dolore, modi dicta eligendi?
        Cupiditate dolore tempora ad cum perferendis voluptates distinctio ea ullam voluptas possimus voluptatibus
        repellendus non dignissimos consequuntur magni itaque, dolor ut. Reprehenderit est impedit quo suscipit
        accusantium cum quaerat laborum corrupti optio aut in, totam natus, laboriosam dolorum, quidem et. Commodi, a?
        Sed sunt modi in quo id. Sapiente delectus voluptate dolores vel nisi? Quia laborum quasi expedita similique
        exercitationem veniam rerum. Ipsam sequi eligendi quod maiores vel et saepe recusandae corporis! Aliquam at
        natus iste hic vitae. Iusto quibusdam repellat ex omnis architecto sint minus culpa provident vel, maiores
        voluptate mollitia atque, totam, assumenda soluta suscipit illum enim officia consequuntur quidem accusamus quam
        cum? Veritatis cumque hic, id ex est optio illo architecto totam ipsa dolor nisi, praesentium modi ab quod quis
        quasi voluptate laudantium iure? Expedita quaerat assumenda itaque. Velit sit voluptas veritatis ea et doloribus
        laboriosam unde deleniti, incidunt expedita mollitia aperiam libero aut aliquid, eveniet molestiae assumenda ut,
        tenetur modi esse ipsa ducimus? Beatae numquam quisquam accusantium, sunt eaque error recusandae, enim quam
        architecto aspernatur tenetur dolorem explicabo consequatur rerum autem voluptas! Suscipit voluptas vel cum,
        dicta doloribus necessitatibus accusantium libero tempore maiores totam quod, consequatur unde labore et placeat
        voluptatibus vero omnis dolor vitae ipsam. Recusandae eius quibusdam obcaecati harum sunt dolorum quisquam
        labore quos qui atque maxime soluta eligendi debitis amet ab culpa perspiciatis accusantium ipsa aliquam
        officiis, deserunt earum a aut? Minus ex obcaecati sint ullam cumque autem distinctio enim blanditiis quas,
        veniam maxime quam tenetur modi soluta omnis ratione repudiandae beatae facere! Repudiandae ea odio nemo
        possimus officia corporis nam quasi rem laboriosam unde eligendi alias, dolore laudantium, repellat voluptate
        et. Quis tenetur aut quae veniam. Recusandae culpa provident earum exercitationem tempore a distinctio, in
        tenetur eligendi, necessitatibus eaque! Nisi temporibus libero ipsum nesciunt eveniet impedit rem mollitia,
        consequuntur accusamus quis officiis eum ut ipsam, praesentium enim possimus nobis omnis error. Dolor ut ipsum
        sint unde sit, odio ipsam at delectus! Accusamus earum rem repellendus, iste, cupiditate doloribus praesentium
        saepe quidem iure odit culpa illum atque quibusdam consectetur. Ut dolorum magni repellendus nostrum dolores
        veritatis perferendis deleniti repudiandae ducimus fugit cupiditate deserunt, ratione autem quia eligendi
        reiciendis assumenda cum! Maiores reiciendis provident sequi vero ullam adipisci quam placeat illum, accusamus
        eum repellat deleniti voluptas dignissimos at? Dolor excepturi ratione dignissimos vel vero sed! Atque tempora
        officiis magni officia cum nesciunt unde illum, asperiores accusantium odio laboriosam sequi eius vel qui
        doloremque voluptatibus dolorum nisi omnis ipsam beatae. Nisi dolore commodi quisquam aut omnis asperiores
        distinctio iure obcaecati cum minus? Magnam earum necessitatibus facere aliquam corporis autem maiores
        consequatur eaque nesciunt, eius quidem error accusamus blanditiis, adipisci tempore! Autem suscipit sequi
        dolorem omnis voluptatum alias consectetur corrupti veniam recusandae beatae dicta deleniti maiores commodi,
        repudiandae nulla veritatis, obcaecati cupiditate facilis assumenda tempora minima pariatur adipisci!
        Accusantium ipsa quae qui. Laudantium quod veniam at saepe maiores temporibus architecto consequatur commodi
        dignissimos enim! Illo saepe similique inventore eos dolor debitis?
      </div>
    </main>
  )
}
export default Home
