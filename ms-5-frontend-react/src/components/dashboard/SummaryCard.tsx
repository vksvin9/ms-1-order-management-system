interface SummaryCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

function SummaryCard({
  title,
  value,
  icon,
  color
}: SummaryCardProps) {
  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className={`card text-white bg-${color} shadow h-100`}>
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h6 className="card-title mb-2">{title}</h6>
            <h2 className="mb-0 fw-bold">{value}</h2>
          </div>

          <div style={{ fontSize: "2.5rem" }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;