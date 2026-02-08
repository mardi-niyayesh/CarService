type ShowCommentType = {
  ImageProfile: string;
  nameuser: string;
  ImageStar: string;
  textComment: string;
};

const  ShowComment= (props: ShowCommentType) => {
  return (
    <>
      <div>
        <div>آنچه مشتریان ما درموردمان گفته‌اند.</div>
        <div>
          <span>نظرات</span>
          <span>مشتریان</span>
        </div>
      </div>
      <div>
        <img src={props.ImageProfile} alt="ImageProfile" />
        <p>{props.nameuser}</p>
        <img src={props.ImageStar} alt="ImageStar" />
        <div>{props.textComment}</div>
      </div>
    </>
  );
};

export default ShowComment;
