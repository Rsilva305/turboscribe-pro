import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">TurboScribe Pro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/features" className="text-sm font-medium hover:underline">Features</Link>
            <Link href="/pricing" className="text-sm font-medium hover:underline">Pricing</Link>
            <Link href="/about" className="text-sm font-medium hover:underline">About</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              Login
            </Link>
            <Link href="/signup" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
              Sign Up
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section - Blue Gradient */}
        <section className="py-20 md:py-24 bg-gradient-to-b from-blue-600 to-blue-500 text-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  Unlimited audio & <br />
                  video transcription
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  Transform your audio and video files into accurate text with our advanced AI transcription service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-white text-blue-600 hover:bg-blue-50 h-11 px-8">
                    Get Started Free
                  </Link>
                  <Link href="/features" className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-white text-white hover:bg-blue-700 h-11 px-8">
                    See how it works
                  </Link>
                </div>
              </div>
              
              {/* Feature Comparison Table */}
              <div className="bg-white p-6 rounded-lg shadow-xl text-gray-800">
                <div className="border-b pb-3 mb-4">
                  <h3 className="font-bold text-lg">Why choose TurboScribe</h3>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <div className="col-span-2 text-sm font-medium">Accuracy</div>
                    <div className="flex justify-between">
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">99%</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">85%</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">80%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <div className="col-span-2 text-sm font-medium">Speaker detection</div>
                    <div className="flex justify-between">
                      <span className="text-green-500">✓</span>
                      <span className="text-green-500">✓</span>
                      <span className="text-red-500">✗</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <div className="col-span-2 text-sm font-medium">Languages</div>
                    <div className="flex justify-between">
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">100+</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">50+</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">20+</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <div className="col-span-2 text-sm font-medium">Processing time</div>
                    <div className="flex justify-between">
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Fast</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">Slow</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">Medium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Try TurboScribe Free Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-5xl">
            <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-bold mb-2">Try TurboScribe for Free</h2>
                  <p className="text-gray-600 mb-6">No credit card required</p>
                  <form className="space-y-4">
                    <input 
                      type="email" 
                      placeholder="Email address" 
                      className="w-full px-4 py-3 border rounded-md"
                    />
                    <input 
                      type="password" 
                      placeholder="Password" 
                      className="w-full px-4 py-3 border rounded-md"
                    />
                    <button className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700">
                      Sign up free
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 mt-4">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
                <div className="p-8 md:p-10 bg-gray-100 flex flex-col justify-center">
                  <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Free account includes:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      30 minutes of free transcription
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Access to all core features
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Export to multiple formats
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Welcome to TurboScribe Section */}
        <section className="py-16 bg-gray-50">
          <div className="container text-center max-w-5xl">
            <h2 className="text-3xl font-bold mb-3">Welcome to TurboScribe</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Our AI-powered transcription service converts audio and video to text with industry-leading accuracy
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Save Time</h3>
                <p className="text-gray-600 text-sm">
                  Convert hours of audio to text in minutes, not days
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">High Accuracy</h3>
                <p className="text-gray-600 text-sm">
                  Industry-leading 99% accuracy with AI enhancement
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Multiple Languages</h3>
                <p className="text-gray-600 text-sm">
                  Support for over 100 languages and dialects
                </p>
              </div>
            </div>
            
            <div className="mt-12 flex justify-center">
              <Link href="/features" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 h-11 px-8">
                Explore all features
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-2">Pricing Plans</h2>
            <p className="text-center text-gray-600 max-w-[600px] mx-auto mb-10">
              Choose the plan that fits your needs. All plans include our core features.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-lg border-2 border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <div className="mt-4 text-4xl font-bold">$0</div>
                  <p className="mt-1 text-sm text-gray-600">Up to 30 minutes</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Basic Transcription
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Standard Export Options
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Speaker Detection
                    </li>
                  </ul>
                  <Link href="/signup" className="mt-6 w-full inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 h-10 px-4">
                    Get Started Free
                  </Link>
                </div>
              </div>
              
              <div className="bg-blue-600 rounded-lg border-2 border-blue-600 shadow-lg overflow-hidden text-white relative">
                <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1">
                  POPULAR
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <div className="mt-4 text-4xl font-bold">$9.99</div>
                  <p className="mt-1 text-sm text-blue-200">per month</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Unlimited Transcription
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Advanced Export Options
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Priority Processing
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Premium Support
                    </li>
                  </ul>
                  <Link href="/signup?plan=pro" className="mt-6 w-full inline-flex items-center justify-center rounded-md text-sm font-medium bg-white text-blue-600 hover:bg-blue-50 h-10 px-4">
                    Get Pro Plan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Reviews</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">Customer Name</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, j) => (
                          <svg key={j} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    &quot;TurboScribe has been a game-changer for our team. The transcription quality is excellent, and it saves us countless hours of manual work. Highly recommended!&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
            <div className="grid gap-6">
              {[
                {
                  q: "How accurate is TurboScribe Pro?",
                  a: "TurboScribe Pro offers industry-leading 99% accuracy for clear audio. Our AI technology continuously improves to handle various accents, technical terminology, and challenging audio conditions."
                },
                {
                  q: "What file formats can I upload?",
                  a: "We support all common audio and video formats including MP3, WAV, MP4, MOV, WMA, AVI, and more."
                },
                {
                  q: "How long does transcription take?",
                  a: "Most files are transcribed in minutes. Processing time depends on file length, quality, and current system load. Pro users receive priority processing."
                }
              ].map((item, i) => (
                <div key={i} className="p-6 border rounded-lg">
                  <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-10 bg-blue-600 text-white">
          <div className="container text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
            <Link href="/signup" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-white text-blue-600 hover:bg-blue-50 h-11 px-8">
              Try TurboScribe Pro Free
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-12 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">TurboScribe Pro</h3>
              <p className="text-sm text-gray-600 mb-4">
                AI-powered audio and video transcription service with industry-leading accuracy.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
                <li><Link href="/testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</Link></li>
                <li><Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                <li><Link href="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-gray-600 hover:text-gray-900">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} TurboScribe Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
