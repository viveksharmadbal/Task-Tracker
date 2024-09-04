import Link from "next/link";

const DashboardCard = ({ title, count, description, link, color }) => {
  return (
    <Link href={link}>
      <div className={`card ${color} p-2`} style={{ width: '22vw', height: '27vh' }}>
        <div className="card-body d-flex flex-column justify-content-center">
          <h1 className="card-title fw-bold">{title}</h1>
          <p className="display-4 text-light">{count}</p>
          <p className="card-text text-light">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
