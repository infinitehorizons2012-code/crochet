import React from 'react';

export default function SymbolRenderer({ type, className = "w-20 h-20", strokeColor = "#0F172A" }) {
  const strokeProps = {
    stroke: strokeColor,
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none"
  };

  const renderSvgContent = () => {
    switch (type) {
      case 'ellipse': // ch
        return <ellipse cx="50" cy="50" rx="30" ry="15" {...strokeProps} />;
      
      case 'dot': // sl st
        return <circle cx="50" cy="50" r="14" fill={strokeColor} />;

      case 'plus_cross': // sc
        return (
          <g>
            <line x1="50" y1="25" x2="50" y2="75" {...strokeProps} />
            <line x1="25" y1="50" x2="75" y2="50" {...strokeProps} />
          </g>
        );

      case 't_shape': // hdc
        return (
          <g>
            <line x1="25" y1="25" x2="75" y2="25" {...strokeProps} />
            <line x1="50" y1="25" x2="50" y2="80" {...strokeProps} />
          </g>
        );

      case 'dc_shape': // dc
        return (
          <g>
            <line x1="25" y1="20" x2="75" y2="20" {...strokeProps} />
            <line x1="50" y1="20" x2="50" y2="80" {...strokeProps} />
            <line x1="38" y1="50" x2="62" y2="44" {...strokeProps} />
          </g>
        );

      case 'tr_shape': // tr
        return (
          <g>
            <line x1="25" y1="18" x2="75" y2="18" {...strokeProps} />
            <line x1="50" y1="18" x2="50" y2="82" {...strokeProps} />
            <line x1="38" y1="42" x2="62" y2="36" {...strokeProps} />
            <line x1="38" y1="58" x2="62" y2="52" {...strokeProps} />
          </g>
        );

      case 'dtr_shape': // dtr
        return (
          <g>
            <line x1="25" y1="15" x2="75" y2="15" {...strokeProps} />
            <line x1="50" y1="15" x2="50" y2="85" {...strokeProps} />
            <line x1="38" y1="35" x2="62" y2="30" {...strokeProps} />
            <line x1="38" y1="50" x2="62" y2="45" {...strokeProps} />
            <line x1="38" y1="65" x2="62" y2="60" {...strokeProps} />
          </g>
        );

      case 'sc2tog_shape': // sc2tog
        return (
          <g>
            <line x1="50" y1="20" x2="30" y2="80" {...strokeProps} />
            <line x1="50" y1="20" x2="70" y2="80" {...strokeProps} />
            <line x1="33" y1="50" x2="45" y2="45" {...strokeProps} />
            <line x1="55" y1="45" x2="67" y2="50" {...strokeProps} />
          </g>
        );

      case 'sc3tog_shape': // sc3tog
        return (
          <g>
            <line x1="50" y1="20" x2="25" y2="80" {...strokeProps} />
            <line x1="50" y1="20" x2="50" y2="80" {...strokeProps} />
            <line x1="50" y1="20" x2="75" y2="80" {...strokeProps} />
            <line x1="30" y1="52" x2="70" y2="48" {...strokeProps} />
          </g>
        );

      case 'dc2tog_shape': // dc2tog
        return (
          <g>
            <line x1="50" y1="20" x2="30" y2="80" {...strokeProps} />
            <line x1="50" y1="20" x2="70" y2="80" {...strokeProps} />
            <line x1="33" y1="50" x2="45" y2="45" {...strokeProps} />
            <line x1="55" y1="45" x2="67" y2="50" {...strokeProps} />
          </g>
        );

      case 'dc3tog_shape': // dc3tog
        return (
          <g>
            <line x1="50" y1="18" x2="25" y2="82" {...strokeProps} />
            <line x1="50" y1="18" x2="50" y2="82" {...strokeProps} />
            <line x1="50" y1="18" x2="75" y2="82" {...strokeProps} />
            <line x1="30" y1="52" x2="70" y2="48" {...strokeProps} />
          </g>
        );

      case 'cluster3dc_shape': // 3-dc cluster
        return (
          <g>
            <path d="M 50 15 C 20 40, 20 60, 50 85 C 80 60, 80 40, 50 15 Z" {...strokeProps} />
            <line x1="50" y1="15" x2="50" y2="85" {...strokeProps} />
            <line x1="35" y1="50" x2="65" y2="45" {...strokeProps} />
          </g>
        );

      case 'popcorn_shape': // 5-dc pop
        return (
          <g>
            <path d="M 30 25 Q 50 15 70 25" {...strokeProps} />
            <line x1="30" y1="25" x2="30" y2="80" {...strokeProps} />
            <line x1="40" y1="20" x2="40" y2="80" {...strokeProps} />
            <line x1="50" y1="18" x2="50" y2="80" {...strokeProps} />
            <line x1="60" y1="20" x2="60" y2="80" {...strokeProps} />
            <line x1="70" y1="25" x2="70" y2="80" {...strokeProps} />
            <line x1="25" y1="50" x2="75" y2="48" {...strokeProps} />
          </g>
        );

      case 'shell_shape': // 5-dc shell
        return (
          <g>
            <line x1="50" y1="80" x2="20" y2="25" {...strokeProps} />
            <line x1="50" y1="80" x2="35" y2="20" {...strokeProps} />
            <line x1="50" y1="80" x2="50" y2="18" {...strokeProps} />
            <line x1="50" y1="80" x2="65" y2="20" {...strokeProps} />
            <line x1="50" y1="80" x2="80" y2="25" {...strokeProps} />
            <line x1="20" y1="25" x2="30" y2="25" {...strokeProps} />
            <line x1="35" y1="20" x2="45" y2="20" {...strokeProps} />
            <line x1="50" y1="18" x2="60" y2="18" {...strokeProps} />
            <line x1="65" y1="20" x2="75" y2="20" {...strokeProps} />
            <line x1="70" y1="25" x2="80" y2="25" {...strokeProps} />
          </g>
        );

      case 'picot_shape': // ch-3 picot
        return (
          <g>
            <circle cx="50" cy="30" r="14" {...strokeProps} />
            <circle cx="34" cy="55" r="10" fill={strokeColor} />
            <circle cx="66" cy="55" r="10" fill={strokeColor} />
          </g>
        );

      case 'fpdc_shape': // fpdc
        return (
          <g>
            <line x1="25" y1="20" x2="75" y2="20" {...strokeProps} />
            <line x1="50" y1="20" x2="50" y2="65" {...strokeProps} />
            <path d="M 50 65 Q 35 80 25 65" {...strokeProps} />
            <line x1="38" y1="42" x2="62" y2="38" {...strokeProps} />
          </g>
        );

      case 'bpdc_shape': // bpdc
        return (
          <g>
            <line x1="25" y1="20" x2="75" y2="20" {...strokeProps} />
            <line x1="50" y1="20" x2="50" y2="65" {...strokeProps} />
            <path d="M 50 65 Q 65 80 75 65" {...strokeProps} />
            <line x1="38" y1="42" x2="62" y2="38" {...strokeProps} />
          </g>
        );

      case 'blo_shape': // blo
        return <path d="M 25 60 C 25 30, 75 30, 75 60" {...strokeProps} />;

      case 'flo_shape': // flo
        return <path d="M 25 40 C 25 70, 75 70, 75 40" {...strokeProps} />;

      case 'fsc_shape': // fsc
        return (
          <g>
            <line x1="50" y1="20" x2="50" y2="60" {...strokeProps} />
            <line x1="30" y1="40" x2="70" y2="40" {...strokeProps} />
            <circle cx="50" cy="72" r="12" {...strokeProps} />
          </g>
        );

      case 'fdc_shape': // fdc
        return (
          <g>
            <line x1="30" y1="18" x2="70" y2="18" {...strokeProps} />
            <line x1="50" y1="18" x2="50" y2="62" {...strokeProps} />
            <line x1="38" y1="40" x2="62" y2="35" {...strokeProps} />
            <circle cx="50" cy="74" r="10" {...strokeProps} />
          </g>
        );

      case 'end_triangle': // end
        return <polygon points="50,20 20,80 80,80" fill={strokeColor} />;

      case 'begin_triangle': // begin
        return <polygon points="50,20 20,80 80,80" {...strokeProps} />;

      default:
        return <circle cx="50" cy="50" r="20" fill={strokeColor} />;
    }
  };

  return (
    <svg viewBox="0 0 100 100" className={className}>
      {renderSvgContent()}
    </svg>
  );
}
