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

      case 'mr_shape': // Magic Ring (MR)
        return (
          <g>
            <circle cx="50" cy="50" r="28" strokeDasharray="8 4" {...strokeProps} />
            <path d="M 50 15 C 30 15, 15 30, 15 50 C 15 70, 30 85, 50 85 C 70 85, 85 70, 85 50" {...strokeProps} />
            <polygon points="50,10 60,18 48,25" fill={strokeColor} />
          </g>
        );

      case 'join_mr_shape': // Joining MR
        return (
          <g>
            <circle cx="50" cy="50" r="28" {...strokeProps} />
            <circle cx="50" cy="22" r="7" fill={strokeColor} />
            <path d="M 40 22 C 30 22, 22 30, 22 40" {...strokeProps} />
            <polygon points="50,15 58,24 45,28" fill={strokeColor} />
          </g>
        );

      case 'color_mr_shape': // Changing Color in MR
        return (
          <g>
            <path d="M 50 22 A 28 28 0 0 1 50 78" stroke="#EC4899" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 50 78 A 28 28 0 0 1 50 22" stroke="#8B5CF6" strokeWidth="6" strokeDasharray="6 4" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="22" r="6" fill="#EC4899" />
            <circle cx="50" cy="78" r="6" fill="#8B5CF6" />
          </g>
        );

      case 'connect_2mr_shape': // Connecting 2 MRs
        return (
          <g>
            <circle cx="36" cy="50" r="24" stroke="#8B5CF6" strokeWidth="6" fill="none" />
            <circle cx="64" cy="50" r="24" stroke="#EC4899" strokeWidth="6" fill="none" />
            <path d="M 50 32 L 50 68" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
          </g>
        );

      case 'x_or_v_shape': // Stitch X or V in MR
        return (
          <g>
            <circle cx="50" cy="50" r="32" stroke="#10B981" strokeWidth="5" fill="none" strokeDasharray="6 3" />
            <path d="M 30 40 L 44 60 M 44 40 L 30 60" stroke="#EC4899" strokeWidth="6" strokeLinecap="round" />
            <path d="M 56 40 L 64 60 L 72 40" stroke="#8B5CF6" strokeWidth="6" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'step_up_mr_shape': // Stepping Up Rounds in MR
        return (
          <g>
            <circle cx="50" cy="54" r="26" stroke="#8B5CF6" strokeWidth="6" fill="none" strokeDasharray="8 4" />
            <path d="M 50 54 L 50 18" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" />
            <polygon points="50,10 60,24 40,24" fill="#3B82F6" />
          </g>
        );

      case 'join_3d_shape': // Joining 2 3D Pieces
        return (
          <g>
            <ellipse cx="36" cy="50" rx="22" ry="26" stroke="#F59E0B" strokeWidth="5" fill="none" />
            <ellipse cx="64" cy="50" rx="22" ry="26" stroke="#EC4899" strokeWidth="5" fill="none" />
            <path d="M 50 28 L 50 72" stroke="#8B5CF6" strokeWidth="6" strokeDasharray="4 3" strokeLinecap="round" />
          </g>
        );

      case 'summary_video_shape': // Level 1 Summary Video
        return (
          <g>
            <rect x="15" y="20" width="70" height="60" rx="16" fill="#EC4899" />
            <polygon points="42,35 68,50 42,65" fill="#FFFFFF" />
            <circle cx="80" cy="24" r="6" fill="#F59E0B" />
          </g>
        );

      case 'sheet_start_shape': // Starting Chain & Knot
        return (
          <g>
            <circle cx="50" cy="50" r="24" stroke="#F59E0B" strokeWidth="6" fill="none" strokeDasharray="12 4" />
            <path d="M 30 50 L 70 50" stroke="#EC4899" strokeWidth="6" strokeLinecap="round" />
            <circle cx="50" cy="50" r="8" fill="#8B5CF6" />
          </g>
        );

      case 'sheet_long_chain_shape': // Long Foundation Chain
        return (
          <g>
            <ellipse cx="25" cy="50" rx="12" ry="7" stroke="#3B82F6" strokeWidth="5" fill="none" />
            <ellipse cx="50" cy="50" rx="12" ry="7" stroke="#EC4899" strokeWidth="5" fill="none" />
            <ellipse cx="75" cy="50" rx="12" ry="7" stroke="#10B981" strokeWidth="5" fill="none" />
          </g>
        );

      case 'sheet_adjust_chain_shape': // Adjusting Excess or Deficit Chain
        return (
          <g>
            <ellipse cx="35" cy="40" rx="10" ry="6" stroke="#3B82F6" strokeWidth="4" fill="none" />
            <ellipse cx="65" cy="40" rx="10" ry="6" stroke="#3B82F6" strokeWidth="4" fill="none" />
            <path d="M 30 65 L 42 65 M 36 59 L 36 71" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
            <path d="M 58 65 L 70 65" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          </g>
        );

      case 'sheet_finish_shape': // Finishing & Invisible Fasten Off
        return (
          <g>
            <rect x="20" y="25" width="60" height="50" rx="8" stroke="#10B981" strokeWidth="5" fill="none" strokeDasharray="6 3" />
            <path d="M 38 50 L 48 60 L 66 40" stroke="#10B981" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );

      case 'sheet_step_up_shape': // Turning Chain & Stepping Up Rows
        return (
          <g>
            <path d="M 20 70 L 80 70 M 20 45 L 80 45 M 20 20 L 60 20" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" strokeDasharray="8 4" />
            <path d="M 75 45 Q 85 45 85 32 Q 85 20 70 20" stroke="#EC4899" strokeWidth="5" fill="none" strokeLinecap="round" />
            <polygon points="65,20 75,14 75,26" fill="#EC4899" />
          </g>
        );

      case 'sheet_add_yarn_shape': // Joining New Yarn Strand
        return (
          <g>
            <path d="M 15 50 Q 35 30 50 50" stroke="#3B82F6" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 50 50 Q 65 70 85 50" stroke="#F59E0B" strokeWidth="6" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="50" r="7" fill="#EC4899" />
          </g>
        );

      case 'sheet_change_color_shape': // Changing Color in Flat Rows
        return (
          <g>
            <rect x="20" y="20" width="60" height="28" fill="#EC4899" rx="4" />
            <rect x="20" y="52" width="60" height="28" fill="#3B82F6" rx="4" />
            <line x1="20" y1="50" x2="80" y2="50" stroke="#F59E0B" strokeWidth="4" strokeDasharray="6 3" />
          </g>
        );

      case 'sheet_row2_shape': // Clean Bottom Edge & Row 2
        return (
          <g>
            <path d="M 15 35 L 85 35 M 15 65 L 85 65" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
            <path d="M 25 35 Q 35 50 45 35 Q 55 50 65 35 Q 75 50 85 35" stroke="#EC4899" strokeWidth="4" fill="none" />
            <circle cx="50" cy="65" r="5" fill="#F59E0B" />
          </g>
        );

      case 'sheet_bottom_loop_shape': // Crocheting Into Bottom Loop
        return (
          <g>
            <path d="M 20 50 Q 50 20 80 50" stroke="#3B82F6" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 20 65 L 80 65" stroke="#8B5CF6" strokeWidth="5" strokeDasharray="6 3" strokeLinecap="round" />
            <circle cx="50" cy="65" r="6" fill="#10B981" />
          </g>
        );

      case 'granny_basic_shape': // Basic Granny Square
        return (
          <g>
            <rect x="18" y="18" width="64" height="64" rx="8" stroke="#8B5CF6" strokeWidth="5" fill="none" />
            <rect x="34" y="34" width="32" height="32" rx="4" stroke="#EC4899" strokeWidth="4" fill="none" />
            <circle cx="50" cy="50" r="5" fill="#F59E0B" />
          </g>
        );

      case 'granny_corner_shape': // Crisp Corner Technique
        return (
          <g>
            <path d="M 25 75 L 25 25 L 75 25" stroke="#10B981" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="25" cy="25" r="8" fill="#F59E0B" />
            <polygon points="65,40 75,55 55,55" fill="#EC4899" />
          </g>
        );

      case 'granny_join_shape': // Joining 2 Granny Squares
        return (
          <g>
            <rect x="12" y="25" width="34" height="50" rx="6" stroke="#3B82F6" strokeWidth="4" fill="none" />
            <rect x="54" y="25" width="34" height="50" rx="6" stroke="#EC4899" strokeWidth="4" fill="none" />
            <path d="M 46 25 L 46 75" stroke="#F59E0B" strokeWidth="5" strokeDasharray="4 3" strokeLinecap="round" />
          </g>
        );

      case 'inc_dec_mr_shape': // Stacking Increases & Decreases in MR
        return (
          <g>
            <circle cx="50" cy="50" r="26" stroke="#8B5CF6" strokeWidth="5" fill="none" strokeDasharray="6 3" />
            <path d="M 36 60 L 50 35 L 64 60" stroke="#10B981" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 36 40 L 50 65 L 64 40" stroke="#EF4444" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );

      case 'level5_bag_shape': // Crochet Bag & Pouch Technique
        return (
          <g>
            <path d="M 24 38 L 76 38 L 82 78 Q 82 85 74 85 L 26 85 Q 18 85 18 78 Z" stroke="#8B5CF6" strokeWidth="5" fill="none" strokeLinejoin="round" />
            <path d="M 34 38 Q 34 16 50 16 Q 66 16 66 38" stroke="#F59E0B" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="58" r="6" fill="#EC4899" />
          </g>
        );

      case 'stitch_bobble_shape': // Bobble Stitch
        return (
          <g>
            <circle cx="35" cy="50" r="14" fill="#EC4899" opacity="0.8" />
            <circle cx="65" cy="50" r="14" fill="#EC4899" opacity="0.8" />
            <circle cx="50" cy="40" r="16" fill="#F43F5E" />
            <path d="M 50 78 L 50 56" stroke="#8B5CF6" strokeWidth="6" strokeLinecap="round" />
          </g>
        );

      case 'stitch_loop_shape': // Loop Stitch
        return (
          <g>
            <path d="M 30 75 L 30 45 Q 30 15 50 15 Q 70 15 70 45 L 70 75" stroke="#3B82F6" strokeWidth="6" fill="none" strokeLinecap="round" />
            <line x1="15" y1="75" x2="85" y2="75" stroke="#10B981" strokeWidth="6" strokeLinecap="round" />
          </g>
        );

      case 'stitch_popcorn_shape': // Popcorn Stitch
        return (
          <g>
            <circle cx="32" cy="38" r="10" fill="#F59E0B" />
            <circle cx="50" cy="28" r="12" fill="#FBBF24" />
            <circle cx="68" cy="38" r="10" fill="#F59E0B" />
            <path d="M 30 78 L 45 42 M 70 78 L 55 42" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" />
          </g>
        );

      case 'stitch_puff_shape': // Puff Stitch
        return (
          <g>
            <ellipse cx="50" cy="42" rx="22" ry="16" fill="#A855F7" />
            <line x1="38" y1="28" x2="38" y2="56" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="26" x2="50" y2="58" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="62" y1="28" x2="62" y2="56" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="58" x2="50" y2="78" stroke="#8B5CF6" strokeWidth="6" strokeLinecap="round" />
          </g>
        );

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
