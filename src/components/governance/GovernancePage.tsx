import React, { useState } from 'react';
import {
  CircleDollarSign,
  Users,
  ThumbsUp,
  Check,
  Clock,
  ArrowLeft,
  Building2,
  Calendar,
} from 'lucide-react';

const stats = [
  {
    name: 'Active Projects',
    value: '12',
    icon: CircleDollarSign,
    change: '+2.5%',
    changeType: 'positive',
  },
  {
    name: 'Council Members',
    value: '5',
    icon: Users,
    change: '0%',
    changeType: 'neutral',
  },
  {
    name: 'Pending Votes',
    value: '3',
    icon: ThumbsUp,
    change: '-1',
    changeType: 'negative',
  },
];

const pendingApprovals = [
  {
    id: '1',
    projectName: 'Greenfield Estates',
    developerName: 'EcoBuild Inc.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    milestone: 'Phase 2',
    fundingAmount: 250000,
    votesReceived: 3,
    totalCouncilMembers: 5,
    deadline: new Date(Date.now() + 86400000 * 7).toISOString(),
    hasVoted: true,
    description: 'Completion of the second phase of Greenfield Estates, including landscaping and community park.'
  },
  {
    id: '2',
    projectName: 'Urban Heights',
    developerName: 'Skyline Group',
    imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    milestone: 'Initial Funding',
    fundingAmount: 400000,
    votesReceived: 2,
    totalCouncilMembers: 5,
    deadline: new Date(Date.now() + 86400000 * 3).toISOString(),
    hasVoted: false,
    description: 'Kickoff of Urban Heights project, covering land acquisition and permits.'
  },
];

const Stats = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    {stats.map((stat) => (
      <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{stat.name}</p>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
          <div className={`p-3 rounded-full bg-indigo-50`}>
            <stat.icon />
          </div>
        </div>
        <div className="mt-4">
          <span className={`text-sm ${
            stat.changeType === 'positive' ? 'text-green-600' :
            stat.changeType === 'negative' ? 'text-red-600' :
            'text-gray-600'
          }`}>
            {stat.change}
          </span>
          <span className="text-sm text-gray-500"> from last month</span>
        </div>
      </div>
    ))}
  </div>
);

// CountdownClock component
const CountdownClock: React.FC<{ deadline: string }> = ({ deadline }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(deadline) - +new Date();
    if (difference <= 0) return null;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof calculateTimeLeft>>(calculateTimeLeft());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  if (!timeLeft) return (
    <span className="ml-3 text-lg font-semibold text-red-600 bg-red-100 px-3 py-1 rounded flex items-center">
      <Clock />
      <span className="ml-1">Expired</span>
    </span>
  );
  return (
    <span className="ml-3 text-lg font-semibold text-indigo-700 bg-indigo-100 px-3 py-1 rounded flex items-center">
      <Clock />
      <span className="ml-1">
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {timeLeft.hours.toString().padStart(2, '0')}:
        {timeLeft.minutes.toString().padStart(2, '0')}:
        {timeLeft.seconds.toString().padStart(2, '0')}
      </span>
    </span>
  );
};

const GovernancePage: React.FC = () => {
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null);
  const [vote, setVote] = useState<'approve' | 'reject' | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [votedProposals, setVotedProposals] = useState<Record<string, boolean>>({});
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [rejectionTouched, setRejectionTouched] = useState(false);
  const [comments, setComments] = useState<Array<{id: string, user: string, date: string, text: string}>>([
    {
      id: 'c1',
      user: 'Alice',
      date: new Date(Date.now() - 1000 * 60 * 60 * 2).toLocaleString(),
      text: 'Looking good! Excited for this milestone.'
    },
    {
      id: 'c2',
      user: 'Bob',
      date: new Date(Date.now() - 1000 * 60 * 30).toLocaleString(),
      text: 'Can we get more details on the landscaping plan?'
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [posting, setPosting] = useState(false);

  const selectedProposal = pendingApprovals.find(p => p.id === selectedProposalId) || null;

  const handleProposalClick = (id: string) => {
    setSelectedProposalId(id);
    setVote(null);
    setShowNotification(false);
    setRejectionReason('');
    setRejectionTouched(false);
  };

  const handleVoteSubmit = () => {
    if (!selectedProposalId || !vote) return;
    if (vote === 'reject' && !rejectionReason.trim()) {
      setRejectionTouched(true);
      return;
    }
    setShowNotification(true);
    setVotedProposals(prev => ({ ...prev, [selectedProposalId]: true }));
    setTimeout(() => {
      setShowNotification(false);
      setSelectedProposalId(null);
    }, 1500);
  };

  if (selectedProposal) {
    const hasVoted = votedProposals[selectedProposal.id] || selectedProposal.hasVoted;
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Vote Notification Popup */}
        {showNotification && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
            <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg">
              <p className="text-lg font-medium">Your Vote has been Registered ✅</p>
            </div>
          </div>
        )}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setSelectedProposalId(null)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft />
            <span>Back to Dashboard</span>
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative h-64">
            <img 
              src={selectedProposal.imageUrl}
              alt={selectedProposal.projectName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl font-bold">{selectedProposal.projectName}</h1>
              <p className="text-lg opacity-90 mt-2">{selectedProposal.developerName}</p>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <Building2 />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Milestone</p>
                  <p className="font-medium">{selectedProposal.milestone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <CircleDollarSign />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Funding Request</p>
                  <p className="font-medium">${selectedProposal.fundingAmount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <Calendar />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-medium">{new Date(selectedProposal.deadline).toLocaleDateString()}<CountdownClock deadline={selectedProposal.deadline} /></p>
                </div>
              </div>
            </div>
            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold mb-4">Milestone Description</h2>
              <p className="text-gray-600">{selectedProposal.description}</p>
            </div>
            {/* Comments Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Comments</h2>
              <div className="space-y-4 mb-4">
                {comments.length === 0 && <div className="text-gray-500">No comments yet. Be the first to comment!</div>}
                {comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center mb-1">
                      <span className="font-semibold text-gray-800 mr-2">{comment.user}</span>
                      <span className="text-xs text-gray-400">{comment.date}</span>
                    </div>
                    <div className="text-gray-700 text-sm whitespace-pre-line">{comment.text}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={2}
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  disabled={posting}
                />
                <div className="flex justify-end">
                  <button
                    className={`px-4 py-1.5 rounded-lg font-medium transition-colors ${newComment.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    disabled={!newComment.trim() || posting}
                    onClick={() => {
                      if (!newComment.trim()) return;
                      setPosting(true);
                      setTimeout(() => {
                        setComments(prev => [
                          {
                            id: Math.random().toString(36).slice(2),
                            user: 'You',
                            date: new Date().toLocaleString(),
                            text: newComment.trim()
                          },
                          ...prev
                        ]);
                        setNewComment('');
                        setPosting(false);
                      }, 500);
                    }}
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Cast Your Vote</h2>
                <div className="flex items-center text-sm text-gray-600">
                  <Users />
                  <span className="ml-1">{selectedProposal.votesReceived}/{selectedProposal.totalCouncilMembers} votes received</span>
                </div>
              </div>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="vote"
                    value="approve"
                    checked={vote === 'approve'}
                    onChange={(e) => {
                      setVote(e.target.value as 'approve');
                      setRejectionReason('');
                      setRejectionTouched(false);
                    }}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    disabled={hasVoted || showNotification}
                  />
                  <span className="text-gray-900 font-medium">Approve Milestone</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="vote"
                    value="reject"
                    checked={vote === 'reject'}
                    onChange={(e) => {
                      setVote(e.target.value as 'reject');
                      setRejectionReason('');
                      setRejectionTouched(false);
                    }}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    disabled={hasVoted || showNotification}
                  />
                  <span className="text-gray-900 font-medium">Reject Milestone</span>
                </label>
                {vote === 'reject' && !hasVoted && !showNotification && (
                  <div className="mt-2">
                    <textarea
                      className={`w-full border rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${rejectionTouched && !rejectionReason.trim() ? 'border-red-500' : 'border-gray-300'}`}
                      rows={3}
                      placeholder="Please explain the reason for rejection..."
                      value={rejectionReason}
                      onChange={e => setRejectionReason(e.target.value)}
                      onBlur={() => setRejectionTouched(true)}
                      disabled={hasVoted || showNotification}
                    />
                    {rejectionTouched && !rejectionReason.trim() && (
                      <div className="text-red-500 text-xs mt-1">Rejection reason is required.</div>
                    )}
                  </div>
                )}
                <button 
                  onClick={handleVoteSubmit}
                  className={`mt-4 px-6 py-2 rounded-lg font-medium ${
                    vote && !hasVoted && !showNotification && (vote !== 'reject' || rejectionReason.trim())
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  } transition-colors`}
                  disabled={
                    !vote || hasVoted || showNotification || (vote === 'reject' && !rejectionReason.trim())
                  }
                >
                  {showNotification ? 'Processing...' : hasVoted ? 'Vote Submitted' : 'Submit Vote'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Governance Council Dashboard</h1>
      <Stats />
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-6 h-6 bg-indigo-200 rounded-full" />
            <h2 className="text-xl font-semibold">Pending Approvals</h2>
          </div>
          <span className="text-sm text-gray-500">Showing {pendingApprovals.length} projects</span>
        </div>
        <div className="space-y-4">
          {pendingApprovals.map((approval) => {
            const hasVoted = votedProposals[approval.id] || approval.hasVoted;
            return (
              <div key={approval.id} className="block group cursor-pointer" onClick={() => handleProposalClick(approval.id)}>
                <div className="border border-gray-200 rounded-xl p-5 hover:border-indigo-500 transition-all duration-200 hover:shadow-md relative">
                  {hasVoted && (
                    <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Check />
                      <span className="ml-1">Voted</span>
                    </div>
                  )}
                  <div className="flex items-start gap-6">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <img 
                        src={approval.imageUrl} 
                        alt={approval.projectName}
                        className="w-full h-full rounded-lg object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="text-white text-xs font-medium px-2 py-1 bg-black/30 rounded-full backdrop-blur-sm w-fit">
                          {approval.milestone}
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {approval.projectName}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{approval.developerName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ${approval.fundingAmount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">Requested Funding</p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Council Votes</span>
                            <span className="font-medium">{approval.votesReceived}/{approval.totalCouncilMembers}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                              style={{ width: `${(approval.votesReceived / approval.totalCouncilMembers) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock />
                              <span className="ml-1">Due {new Date(approval.deadline).toLocaleDateString()}<CountdownClock deadline={approval.deadline} /></span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users />
                              <span className="ml-1">{approval.votesReceived} votes</span>
                            </div>
                          </div>
                          {/* No voting action in this mockup */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GovernancePage; 