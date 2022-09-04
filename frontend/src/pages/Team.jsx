import aliyu from "../img/aliyu.jpg"
import zek from "../img/zek.jpg"
import users from "../img/users.jpg"

const Team = () => {
    return (
        <>
        <section class="bg-white">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Designed for projects like yours</h2>
                    <p class="mb-5 font-light text-gray-500 sm:text-xl">Here at baoRnD we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                </div>
                <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
               
                    <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-custom-50 rounded-lg border border-gray-100 shadow xl:p-8">
                        <div class="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                            <img src={aliyu} alt=""  />
                        </div>
                        <h3 class="mb-4 text-2xl font-semibold">Aliyu Alege</h3>
                        <p class="font-light text-gray-500 sm:text-lg">CEO, baoRnD.</p>

                        <p className="mt-8">Aliyu is a highly educated individual with geat management and leadership skills. He also gets his hands dirty when required, as he is 
                            a trained Computer Scientist and Software Engineer. He is an experienced researcher has been lucky to work with top researchers in 
                            different scientific fields. 
                        </p>
                        
                    </div>
                   
                    <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-custom-50 rounded-lg border border-gray-100 shadow xl:p-8">
                        <div class="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                            <img src={zek} alt=""  />
                        </div>
                        <h3 class="mb-4 text-2xl font-semibold">Zekarias Taye</h3>
                        <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">CTO, baoRnD.</p>
                       
                        <p className="mt-8">Zek, as he is fondly called, has a masters degeree and Computer Science and Software Engineering and a bachelors
                            in the same field. His intelligence and hardwork keeps pushing the whole of baoRnD to be the best they can be. 
                            He is an experienced researcher has been lucky to work with top researchers in 
                            different Computer Science fields. 
                        </p>
                    </div>
                    
                    <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-custom-50 rounded-lg border border-gray-100 shadow xl:p-8">
                        <div class="text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                            <img src={users} alt=""  />
                        </div>
                        <h3 class="mb-4 text-2xl font-semibold">Our Users</h3>
                        <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Product Success Deciders, baoRnD.</p>
                        
                        <p className="mt-8">This might sound cliche but it is true that our users decide what features we develop on baoRnD. Using our 
                            special <a href="/support" className="text-custom-100 font-bold hover:text-custom-150">community tool</a>, they suggest and/or vote on new features. 
                            Our job is to provide what our users need, which we try 
                            our best to do. This makes us the most customer-centric company in the world.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Team