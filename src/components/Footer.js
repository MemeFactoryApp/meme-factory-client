function Footer() {

return(
<footer class="p-3  flex w-full sticky bottom-0 flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
  <p class="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
    © 2023 Meme-Factory
  </p>
  <ul class="flex flex-wrap items-center gap-y-2 gap-x-8">
    <li>
      <a
        class="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-pink-500 focus:text-pink-500"
      >
        About Us
      </a>
    </li>
    <li>
      <a
        class="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-pink-500 focus:text-pink-500"
      >
        License
      </a>
    </li>
    <li>
      <a
        class="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-pink-500 focus:text-pink-500"
      >
        Contribute
      </a>
    </li>
    <li>
      <a
        class="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-pink-500 focus:text-pink-500"
      >
        Contact Us
      </a>
    </li>
  </ul>
</footer>
)}

export default Footer