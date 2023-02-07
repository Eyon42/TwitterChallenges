import { useState } from "react";
import reactLogo from "./assets/react.svg";

function App() {
  return (
    <div className="flex flex-col bg-slate-50 m-0 max-w-2xl mx-auto my-0  min-h-screen justify-center space-y-5">
      <h1 className="text-3xl font-bold underline text-center py-4">
        Tweet component using Tailwind CSS
      </h1>
      <Tweet
        content="Dolore veniam ut aliquid consequuntur consequatur enim et officia. Ad molestiae veniam eveniet voluptatem. Omnis dolore assumenda vel eum nam accusamus. Quia qui explicabo aspernatur. Veniam reiciendis quas ut nihil consequatur consequatur veritatis adipisci. Non numquam et voluptatem fuga commodi qui quod molestiae."
        user={{
          name: "eyon.dev",
          handle: "eyondev",
          pictureURL: "/profilePic.jpg",
        }}
        publishingDate="2021-08-01 12:00:00"
        likes={0}
      />
    </div>
  );
}
export default App;

const Tweet = (props) => {
  const { content, user, publishingDate } = props;
  const [isLiked, setIsLiked] = useState(true);
  return (
    <div className="flex flex-row m-2">
      <img src={user.pictureURL} className="w-10 rounded-full h-full m-2" />
      <div className="flex flex-col w-full m-2">
        <div className="flex justify-between">
          <div>
            <span className="font-bold">{user.name}</span>
            <span className="text-gray-500 font-light mx-2">
              @{user.handle} · {publishingDate}
            </span>
          </div>
          <MoreIcon />
        </div>
        <div>
          <p>{content}</p>
        </div>
        <div className="flex flex-row h-10 w-full justify-between">
          <CommentIcon />
          <RetweetIcon />
          <LikeIcon
            isLiked={isLiked}
            toogleLike={() => setIsLiked((l) => !l)}
            likes={props.likes}
          />
          <ReproductionsIcon />
          <ShareIcon />
        </div>
      </div>
    </div>
  );
};

const BaseIcon = (props) => {
  const { children, className } = props;
  return (
    <div className={`flex h-auto w-6 ${className}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>{children}</g>
      </svg>
    </div>
  );
};

const CommentIcon = () => (
  <BaseIcon>
    <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
  </BaseIcon>
);

const RetweetIcon = () => (
  <BaseIcon>
    <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
  </BaseIcon>
);

const LikeIcon = (props) => {
  console.log(props);
  const { isLiked, toogleLike, likes } = props;
  return (
    <div onClick={toogleLike} className="flex items-center">
      {isLiked ? (
        <>
          <BaseIcon className="fill-red-500">
            <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
          </BaseIcon>
          <span className="text-red-500 pl-1">{likes + 1}</span>
        </>
      ) : (
        <>
          <BaseIcon>
            <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
          </BaseIcon>
          {likes > 0 && <span className="pl-1">{likes}</span>}
        </>
      )}
    </div>
  );
};

const ReproductionsIcon = () => (
  <BaseIcon>
    <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
  </BaseIcon>
);

const ShareIcon = () => (
  <BaseIcon>
    <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>
  </BaseIcon>
);

const MoreIcon = () => (
  <BaseIcon>
    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
  </BaseIcon>
);
