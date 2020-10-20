import React from "react";

interface Props {}

const FoodIcon: React.FC<Props> = () => {
  return (
    <svg viewBox="0 0 1000 1000">
      <g>
        <path d="m 704.51758,172.91211 c 0,5.47526 0,10.95052 0,16.42578 -77.39453,0 -154.78906,0 -232.1836,0 2.33399,20.27279 4.66797,40.54557 7.00196,60.81836 150.41666,0 300.83333,0 451.25,0 -22.95387,229.51028 -45.90549,459.02078 -68.85742,688.53125 -21.18099,0 -42.36198,0 -63.54297,0 0,20.27279 0,40.54557 0,60.81836 22.51694,-0.0138 45.0352,0.0604 67.55118,-0.11771 15.97449,-0.83923 31.33269,-8.67564 41.70704,-20.79883 2.32445,-2.67858 4.41328,-5.55915 6.25545,-8.58932 0.31049,-0.52983 0.79748,-1.33927 1.15156,-1.98812 4.42701,-7.89996 7.09806,-16.76733 7.77398,-25.79795 25.06226,-250.95799 50.11552,-501.91689 75.16626,-752.87604 -77.48568,0 -154.97136,0 -232.45704,0 0,-62.44596 0,-124.891926 0,-187.33789 -20.27213,0 -40.54427,0 -60.8164,0 0,56.970703 0,113.94141 0,170.91211 z M 331.9043,376.24414 c -12.26462,0.13721 -24.45481,0.73148 -36.69144,1.81267 -12.22134,1.07776 -24.41733,2.64411 -36.56511,4.70648 -4.99182,0.84515 -10.05648,1.80511 -15.01103,2.81679 -3.48642,0.71378 -6.95177,1.48911 -10.45313,2.28711 -6.0524,1.40737 -12.24633,2.98124 -18.29911,4.66199 -6.00567,1.68021 -11.98154,3.48401 -17.95422,5.44479 -9.68328,3.19344 -19.34105,6.76804 -28.79483,10.75385 -4.37413,1.84754 -8.87386,3.83803 -13.1589,5.85127 -4.75895,2.23005 -9.62712,4.64465 -14.27221,7.09764 -13.11783,6.89848 -25.76737,14.69492 -37.77073,23.39163 -1.3304,0.98713 -2.8522,2.08534 -4.236206,3.14273 -20.480576,15.41117 -38.887501,33.68501 -53.821747,54.54826 -8.296411,11.5586 -15.499271,23.90312 -21.455715,36.82463 -0.579114,1.28535 -1.268913,2.77713 -1.857988,4.15771 -8.654877,19.76226 -14.3642308,40.77631 -17.2230285,62.15052 -0.824546,6.10975 -1.4264433,12.35337 -1.8037493,18.44177 -0.2712683,0.85512 0.8724092,0.37114 1.3726563,0.4961 222.4193975,0 444.8387975,0 667.2582075,0 -0.71872,-12.08371 -2.301,-24.28744 -4.79307,-36.20113 -2.04776,-9.85557 -4.76657,-19.7167 -8.11749,-29.28563 -0.90298,-2.56332 -1.82783,-5.07166 -2.83693,-7.6397 -0.90265,-2.29919 -1.8273,-4.5357 -2.82122,-6.84277 -5.54961,-12.9437 -12.4497,-25.49763 -20.39713,-37.21264 -11.32246,-16.73431 -25.00164,-32.04216 -40.16287,-45.49304 -7.37173,-6.56146 -15.12439,-12.6902 -23.15645,-18.42275 -2.65422,-1.88854 -5.52822,-3.87246 -8.25195,-5.67578 -5.44652,-3.61485 -11.0522,-7.07932 -16.63813,-10.30054 -5.57563,-3.22541 -11.24934,-6.25389 -17.02643,-9.16873 -1.99732,-0.9842 -4.19681,-2.08047 -6.28915,-3.07539 -4.567,-2.17156 -9.07808,-4.20709 -13.75751,-6.19714 -11.13948,-4.73796 -22.68954,-8.98917 -34.22605,-12.64756 -13.59113,-4.32051 -27.41333,-7.90497 -41.37133,-10.82548 -5.92329,-1.23138 -12.08212,-2.38969 -18.0512,-3.37148 -11.29238,-1.88139 -22.74028,-3.32432 -34.08942,-4.35313 -5.95591,-0.53454 -11.87014,-0.95689 -17.82227,-1.26172 -3.72241,-0.18582 -7.43357,-0.35259 -11.10658,-0.43412 -6.11388,-0.16982 -12.23054,-0.21895 -18.34654,-0.17721 z m 4.93164,60.78125 c 36.86594,0.18946 73.67415,5.62087 109.10322,15.78171 28.37264,8.23011 55.91067,19.88413 80.67452,36.10014 19.54724,12.8529 37.22585,28.77338 51.0773,47.6878 1.90062,2.60295 3.99145,5.15039 5.22113,8.15887 2.36322,6.48541 -0.6413,14.54837 -6.8983,17.61045 -3.36799,1.91414 -7.36392,1.6851 -11.09779,1.63955 -162.85938,0.003 -325.71875,0.005 -488.578129,0.008 7.688998,-10.53795 14.95961,-21.38098 22.923709,-31.71582 9.39372,-12.14679 20.50963,-22.90211 32.54721,-32.4074 23.13649,-18.19564 49.81822,-31.46071 77.50776,-41.1895 28.42448,-9.9746 58.08983,-16.20482 88.01012,-19.47493 13.12085,-1.4013 26.3133,-2.13348 39.50925,-2.19868 z M 2.0019531,812.16797 c 223.2220069,0 446.4440069,0 669.6660169,0 0,-20.27279 0,-40.54557 0,-60.81836 -223.22201,0 -446.44401,0 -669.6660169,0 0,20.27279 0,40.54557 0,60.81836 z m 0,155.87305 c -0.1405903,10.80313 5.8673421,21.50289 15.3012609,26.82683 5.136602,2.99899 11.140206,4.37603 17.069442,4.17503 202.759304,-0.0233 405.518894,-8.5e-4 608.278014,-0.0436 11.03098,-0.36417 21.61334,-7.20904 26.34539,-17.20221 2.46726,-4.98452 3.36362,-10.62326 3.13875,-16.14898 6.4e-4,-8.9875 0.001,-17.975 0.002,-26.9625 -223.37826,0 -446.75651,0 -670.1347669,0 0,9.78515 0,19.57031 0,29.35547 z" />
      </g>
    </svg>
  );
};

export default FoodIcon;