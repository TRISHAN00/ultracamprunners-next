import TeamCard from "./TeamCard";

const TeamSection = ({ teamMembers }) => {
  return (
    <section className="py-[150px] ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers?.images?.list?.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
