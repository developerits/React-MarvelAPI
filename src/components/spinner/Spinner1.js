import React from "react";
import ContentLoader from "react-content-loader";

const Spinner = (props) => (
  <ContentLoader
    speed={2}
    width={512}
    height={260}
    viewBox="0 0 512 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="763" y="282" rx="3" ry="3" width="88" height="6" />
    <rect x="760" y="279" rx="3" ry="3" width="52" height="6" />
    <rect x="543" y="303" rx="3" ry="3" width="410" height="6" />
    <rect x="508" y="288" rx="3" ry="3" width="380" height="6" />
    <rect x="593" y="309" rx="3" ry="3" width="178" height="6" />
    <circle cx="580" cy="238" r="20" />
    <rect x="665" y="239" rx="0" ry="0" width="13" height="58" />
    <circle cx="775" cy="338" r="49" />
    <circle cx="637" cy="302" r="76" />
    <rect x="409" y="384" rx="0" ry="0" width="54" height="58" />
    <rect x="575" y="210" rx="0" ry="0" width="60" height="31" />
    <rect x="378" y="305" rx="0" ry="0" width="86" height="47" />
    <rect x="368" y="308" rx="0" ry="0" width="89" height="74" />
    <rect x="541" y="387" rx="0" ry="0" width="99" height="68" />
    <rect x="51" y="38" rx="0" ry="0" width="176" height="175" />
    <rect x="249" y="45" rx="0" ry="0" width="100" height="22" />
    <rect x="251" y="81" rx="0" ry="0" width="103" height="17" />
  </ContentLoader>
);

export default Spinner;
