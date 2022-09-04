const FAQ = () => {
    return (
        <>
        <section class="bg-white">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Designed for projects like yours</h2>
                    <p class="mb-5 font-light text-gray-500 sm:text-xl">Here at baoRnD we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                </div>
                
                <div class="mx-auto max-w-screen-md mt-8 mb-8 lg:mb-12">
                    <div class="flex flex-col p-6 mx-auto max-w-lg text-gray-900 bg-custom-50 rounded-lg border border-gray-100 shadow xl:p-8">
                        <div class="max-w-lg text-center">
                            <h3 class="text-2xl mb-5 font-semibold text-custom-100">Let us talk!</h3>
                        </div>
                        
                        <div class="space-y-1 mb-5">
                            <p class="sm:text-xl float-left">
                                <span className="font-semibold text-custom-150">Q: </span> What is baoRnD?
                            </p>

                            <p class="sm:text-xl float-left">
                                <span className="font-semibold text-custom-100">A: </span> baoRnD is a Singaporean software company providing repository, networking and management solutions for projects involving little or no code.
                            </p>
                        </div>

                        <div class="space-y-1 mb-5">
                            <p class="sm:text-xl float-left">
                                <span className="font-semibold text-custom-150">Q: </span> Can I use baoRnD today?
                            </p>

                            <p class="sm:text-xl float-left">
                                <span className="font-semibold text-custom-100">A: </span> 
                                The short answer is YES. However, we are still private beta stage, hence we onboard around 5 users per week. If you can join the 
                                waitlist to <a href="/earlyaccess" className="text-custom-100 hover:text-custom-150 font-semibold">get early access</a>. 
                                We send signup emails on a first come first serve basis. So, it might take some time to get to your
                                email. Please bear with us.
                            </p>
                        </div>

                        <p>Please <a href="/contact" className="text-custom-100 hover:text-custom-150 font-semibold">contact us</a> with your questions.</p>
                        
                    </div>

                </div>
            </div>
        </section>
        </>
    )
}

export default FAQ