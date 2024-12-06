import { Cloudinary } from '@cloudinary/url-gen';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';

type CloudImageProps = {
  public_id: string,
  width: number,
  height: number
}

export default function CloudImage({public_id, width, height}: CloudImageProps) {
  const cld = new Cloudinary({ cloud: { cloudName: 'diy7juddz' }})

  const img = cld
        .image(public_id)
        .format('auto')
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(width).height(height));
  return (
    <AdvancedImage cldImg={img} alt={`imagen ${public_id}`}/>
  )
}
