import {useState, useRef} from 'react'
import {toast} from 'react-toastify'

const Generator = () => {

  const [image, setImage] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const inputRef = useRef();

  const generate = (text) => {
    if (text === '') {
      toast.error('Enter your text or URL')
      return

    } else {
      const src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`
      setIsGenerated(true)
      setImage(src)
    }
  }

  const downloadQR = async () => {
    try {
      const response = await fetch(image)
      if (!response.ok) {
        throw new Error(`QR code download failed with status ${response.status}`)
      }

      const objectUrl = URL.createObjectURL(await response.blob())
      const link = document.createElement('a')
      link.href = objectUrl
      link.download = 'qrcode.png'
      document.body.appendChild(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
    } catch (error) {
      console.error('Failed to download QR code:', error)
      toast.error('Unable to download the QR code. Please try again.')
    }
  }

  const handleEnter = (e) => {
    const massage = e.target.value;

    if(e.key === "Enter" && massage === "") {
      toast.error('Enter your text or URL')
      return;
    }

    if (e.key === "Enter" && massage) {
      generate(massage);
    } 
  }
 
  return (
    <div className="min-h-screen w-full p-5">
      <div className="w-full sm:w-102 px-8 pt-6 pb-9 mx-auto mt-12 bg-white rounded-md">
        <span className='font-bold text-black'>Enter your text or URL</span>
        <input className='w-full mt-4 py-3 px-2 outline-none rounded-sm border-1 border-[#494eea]' type="text" placeholder="Text or URL" ref={inputRef} onKeyDown={handleEnter}/>
        <div className={` ${isGenerated === false ? 'hidden' : 'block'} flex w-50 h-50 justify-center items-center mx-auto border-1 border-[#d1d1d1] rounded-sm mt-9 transition-all duration-200`}>
          <img className='w-full h-full p-3' src={image} />
        </div>
        {isGenerated && (
          <button className="block mt-4 mx-auto px-4 py-2 text-[#494eea] rounded-sm cursor-pointer border-1 border-[#494eea] shadow-md transition-all duration-300 hover:scale-105" onClick={downloadQR}>Download QR Code</button>
        )}
        <button className="w-full mt-9 p-3 text-white rounded-sm cursor-pointer bg-[#494eea] shadow-md transition-all duration-300 hover:scale-105" onClick={() => generate(inputRef.current.value)}>Generate QR Code</button>
      </div>
    </div>
  )
}

export default Generator