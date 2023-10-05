const WeatherAdditionalInfo = ({img, info}) => {
    return (
            <span className="flex justify-center items-center">
                <img className="w-[25.36px] h-[25.36px]" src={img} alt="" />
                <p className="" >{info.measures} {info.measurement}</p>
            </span>
    )
}

export default WeatherAdditionalInfo