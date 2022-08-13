import illustration2 from "../img/illustration.jpg"
import avatar_anisha from "../img/avatar-anisha.png"
import avatar_richard from "../img/avatar-richard.png"
import avatar_ali from "../img/avatar-ali.png"

const Landing = () => {
  return (
    <>
    {/* Hero section */}
    <section id="hero">
      {/* Flex container */}
      <div className="container flex flex-col-reverse md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
        {/* Left item */}
        <div class="flex flex-col mb-32 space-y-12 md:w-1/2">
          <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left text-custom-100">
            boarderless and open Research and Development 
          </h1>
          <p className="max-w-sm text-center md:text-left text-gray-600">
            baoRnD makes it simple for RnD workers to achieve thier RnD project goals while improving efficiency by a high order of magnitude.
          </p>
          <div className="flex justify-center md:justify-start">
            <a
            href="http://localhosT:3000/earlyaccess"
            class="hidden p-3 px-6 pt-2 text-white bg-custom-150 rounded-full baseline hover:bg-custom-100 md:block">Get Early Access
            </a>
          </div>
        </div>

        {/* Image */}
        <div class="md:w-1/2">
              <img src={illustration2} alt=''/>
        </div>
      </div>
    </section>

    {/* Features section */}
    <section id="idefeatures" class="bg-custom-50 pt-10 pb-10">
          {/* Flex container */}
          <div className="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row">
            {/* What is baoRnD: basic functionalities */}
            <div class="flex flex-col space-y-12 md:w-1/2">
              <h2 className="max-w-md text-4xl font-bold text-center md:text-left">
                What is <span class="text-custom-100">baoRnD?</span>
              </h2>
              <p className="max-w-sm text-center md:text-left text-gray-600">
                baoRnD provides all the functionality you need to manage RnD projects, update stakeholders, publicize your work, get necessary support, 
                and perform computations in your browser; as well as follow RnD projects!
              </p>
            </div>

            {/* Numbered List */}
            <div class="flex flex-col space-y-8 md:w-1/2">
              {/* List item 1 */}
              <div class="bg-white py-8 px-6 border-2 border-custom-100 rounded-lg sm:px-10">
                <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
                  {/* Heading */}
                  <div className="rounded-l-full bg-custom-155 md:bg-transparent border-solid border-custom-100">
                    <div className="flex items-center space-x-2">
                      <div className="px-4 py-2-text-white rounded-full md:py-1 bg-custom-150 text-white">
                        01
                      </div>
                      <h3 className="text-base font-bold md:mb-4 text-custom-100 md:hidden">
                        Repository for RnD Artifacts
                      </h3>
                    </div>
                  </div>

                  <h3 className="hidden mb-4 text-lg font-bold md:block text-custom-100">
                    Repository for RnD Artifacts
                  </h3>
                  <p className="text-black">
                    Host, manage and push updates to a project repository. 
                    The artifacts don`t have to be code. You can host proposals, materials, manage milestones, etc on your specialized project repo. 
                    Your project repository also serves the purpose of presenting your project to the world if you make it public. Kill two brids with one stone.
                  </p>
                </div>
              </div>

              {/* List item 2 */}
              <div class="bg-white py-8 px-6 border-2 border-custom-100 rounded-lg sm:px-10">
                <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
                  {/* Heading */}
                  <div className="rounded-l-full bg-custom-155 md:bg-transparent border-solid border-custom-100">
                    <div className="flex items-center space-x-2">
                      <div className="px-4 py-2-text-white rounded-full md:py-1 bg-custom-150 text-white">
                        02
                      </div>
                      <h3 className="text-base font-bold md:mb-4 text-custom-100 md:hidden">
                        Collaborate with Researchers and Labs
                      </h3>
                    </div>
                  </div>

                  <h3 className="hidden mb-4 text-lg font-bold md:block text-custom-100">
                    Collaborate and Get Support
                  </h3>
                  <p className="text-black">
                    Find RnD talents and research labs/institutes to collaborate with on your RnD efforts or contribute equipment or space to people/teams
                    working on projects you find interesting. Some users put up their research projects for funding from interested investors. No matter the kind of
                    support you seek, baoRnD users will give it to you if they find your project interesting because we strive on mutual support. 
                    Tap into the vast array of support available on baoRnD.
                  </p>
                </div>
              </div>

              {/* List item 3 */}
              <div class="bg-white py-8 px-6 border-2 border-custom-100 rounded-lg sm:px-10">
                <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
                  {/* Heading */}
                  <div className="rounded-l-full bg-custom-155 md:bg-transparent border-solid border-custom-100">
                    <div className="flex items-center space-x-2">
                      <div className="px-4 py-2-text-white rounded-full md:py-1 bg-custom-150 text-white">
                        03
                      </div>
                      <h3 className="text-base font-bold md:mb-4 text-custom-100 md:hidden">
                        Publicize and Follow RnD Projects that Interest You
                      </h3>
                    </div>
                  </div>

                  <h3 className="hidden mb-4 text-lg font-bold md:block text-custom-100">
                        Publicize and Follow RnD Projects
                  </h3>
                  <p className="text-black">
                    It is traditionally difficult to publicize scientific or RnD work for myriad reasons. banRnD provides a simple 
                    solution to this problem. You can follow projects or make your project public and have it followed by the interested people. There 
                    are other interesting features that makes engagement with your project`s followers easy.   
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials">
          {/* Container heading and testimonial blocks */}
          <div className="max-w-6xl px-5 mx-auto mt-32 text-center">
            {/* Heading */}
            <h2 className="text-4xl font-bold text-center">
              Why users like <span class="text-custom-100">baoRnD?</span>
            </h2>
            {/* Testimonials */}
            <div className="flex flex-col mt-24 md:flex-row md:space-x-6">
              {/* Testimonial 1 */}
              <div className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-custom-50 md:w-1/3 sm:mb-12">
                <img src={avatar_anisha} class="w-16 -mt-14" alt="" />
                <h5 className="text-lg font-bold">Anisha Lee</h5>
                <p className="text-sm text-custom-120">baoRnd has supercharged my research. The ability to publicize my work while ensuring accurate results with the tools on baoRnD.
                The engagement I get from my project`s followers fill me with new insights.</p>
              </div>

              {/* Testimonial 2 */}
              <div className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-custom-50 md:w-1/3 sm:mb-12">
                <img src={avatar_richard} class="w-16 -mt-14" alt="" />
                <h5 className="text-lg font-bold">Richard Duncan</h5>
                <p className="text-sm text-custom-120">I love baoRnd especially because it has helped me to efficiently and easily supervise my students` projects.
                Having all projects and their materials/information in one place has improved my output and state of mind.</p>
              </div>

              {/* Testimonial 3 */}
              <div className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-custom-50 md:w-1/3 sm:mb-12">
                <img src={avatar_ali} class="w-16 -mt-14" alt="" />
                <h5 className="text-lg font-bold">Ali Lam</h5>
                <p className="text-sm text-custom-120">I did not want to limit myself to RnD projects in big corporations, so I put up my project on baoRnd. I am 2 months into 
                the project after I recieved funding and lab space on baoRnD.</p>
              </div>
            </div> 

            <div className="my-8">
              {/* Button */}
              <a
                href="http://localhosT:3000/earlyaccess"
                class="p-3 px-6 pt-2 text-white bg-custom-150 rounded-full baseline hover:bg-custom-100">Get Early Access
              </a>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section id="cta" class="bg-custom-50">
          {/* Flex container */}
          <div className="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0">
            <h2 className="text-5xl font-bold leading-tight text-center text-black md:text-4xl md:max-w-xl md:text-left">
              Take your Reaserch and Development game to the next level today
            </h2>

            {/* Button */}
            <div>
              <a
                href="http://localhosT:3000/earlyaccess"
                class="p-3 px-6 pt-2 shadow-2xl text-white bg-custom-150 rounded-full baseline hover:bg-custom-100">Join the waitlist
              </a>
            </div>
          </div>
        </section>
    </>
  )
}

export default Landing